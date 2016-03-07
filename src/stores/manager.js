import firstBy from 'thenby'
import { observable, computed, action, map } from 'mobx'
import { flatMap } from 'lodash'
import { binaryInsert } from './support'

import Network from './network'

export default class Manager {
  @observable networkMap = map()
  @observable packets = []

  @observable filter = {
    query: '',
    channels: [],
  }

  constructor(networks, nick = 'io42') {
    this.nick = nick
    this.addNetworks(networks)
  }

  addPacketSorted = binaryInsert(this.packets, firstBy('name').thenBy(p => p.bot.name).thenBy('number'))

  @action addPacket(packet) {
    this.addPacketSorted(packet)
  }

  @action addNetworks(networks) {
    networks.forEach((props) => {
      this.networkMap.set(props.name, new Network({ nick: this.nick, ...props, manager: this }))
    })
  }

  @action toggleChannel(channel) {
    if (this.filter.channels.includes(channel)) {
      this.filter.channels.remove(channel)
    } else {
      this.filter.channels.push(channel)
    }
  }

  @action clearChannels() {
    this.filter.channels.clear()
  }

  @action setQuery(value) {
    this.filter.query = value
  }

  @computed get networks() {
    return this.networkMap.values().sort(firstBy('name'))
  }

  @computed get transfers() {
    return flatMap(this.networks, network => network.transfers)
  }
}
