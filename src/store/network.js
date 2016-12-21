import firstBy from 'thenby'
import Client from 'squelch-client'
import deferred from 'defer-decorator'
import { observable, computed, transaction, action, runInAction, map } from 'mobx'
import { flatMap } from 'lodash'

import Channel from './channel'
import Bot from './bot'

import { parsePacket, parseDCCSendOffer } from './support'

export default class Network {
  @observable isConnected = false;
  @observable botMap = map()
  @observable channelMap = map()

  constructor(props) {
    const { channels, ...extraProps } = props
    Object.assign(this, extraProps)
    this.key = props.name
    transaction(() => {
      channels.forEach((channel) => {
        this.upsertChannel(channel.toLocaleLowerCase())
      })
    })
    this.client = new Client({ server: this.server, nick: this.nick, channels, autoConnect: true })
    this.client.on('connect', this.onConnect)
    this.client.on('disconnect', this.onDisconnect)
    this.client.on('join', this.onJoin)
    this.client.on('msg', this.onMessage)
    this.client.on('error', this.onError)
  }

  @computed get bots() {
    return this.botMap.values()
  }

  @computed get packets() {
    return flatMap(this.bots, bot => bot.packets)
  }

  @computed get transfers() {
    return flatMap(this.bots, bot => bot.transfers.toJS())
  }

  @computed get channels() {
    return this.channelMap.values().sort(firstBy('name'))
  }

  onError = (err) => {
    // console.error(err.raw)
  }

  onConnect = ({ nick, server, port }) => {
    runInAction('connect', () => {
      this.isConnected = true
    })
  }

  onDisconnect = ({ reason }) => {
    runInAction('disconnect', () => {
      this.isConnected = false
      this.botMap.clear()
      this.channelMap.clear()
    })
  }

  onJoin = ({ chan, nick, me }) => {
    runInAction('join', () => {
      if (me) {
        const channel = this.upsertChannel(chan.toLocaleLowerCase())
        channel.isJoined = true
      }
    })
  }

  onPart = ({ chan, nick, reason, me }) => {
    runInAction('part', () => {
      if (me) {
        this.channelMap.delete(chan.toLocaleLowerCase())
      } else {
        const botName = nick.toLocaleLowerCase()
        this.botMap.delete(botName)
        this.channelMap.forEach(channel => channel.botMap.delete(botName))
      }
    })
  }

  onMessage = (message) => {
    runInAction('message', () => {
      this.processMessage(message)
    })
  }

  @deferred processMessage({ from, to, msg }) {
    const botName = from.toLocaleLowerCase()
    const channelName = to.toLocaleLowerCase()

    const packetProps = parsePacket(msg)
    if (packetProps) {
      this.processPacket({ botName, channelName, ...packetProps })
      return
    }

    const dccOffer = parseDCCSendOffer(msg)
    if (dccOffer) {
      const bot = this.botMap.get(botName)
      if (bot) {
        bot.onDCCSend(dccOffer)
      }
    }
  }

  @action upsertBot(name) {
    let bot = this.botMap.get(name)
    if (!bot) {
      bot = new Bot({ name, network: this })
      this.botMap.set(name, bot)
    }
    return bot
  }

  @action upsertChannel(name) {
    let channel = this.channelMap.get(name)
    if (!channel) {
      channel = new Channel({ name, network: this })
      this.channelMap.set(name, channel)
    }
    return channel
  }

  @action processPacket({ channelName, botName, number, downloadCount, size, name }) {
    const bot = this.upsertBot(botName)
    const channel = this.upsertChannel(channelName)
    const packet = bot.upsertPacket(number, name, downloadCount, size)
    packet.addChannel(channel)
    bot.addChannel(channel)
    channel.addBot(bot)
    this.store.addPacket(packet)
  }
}
