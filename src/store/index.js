import firstBy from 'thenby'

import { observable, computed, action, map, toJS } from 'mobx'
import { flatMap } from 'lodash'

import { binaryInsert } from 'support'

import Network from './network'
import Settings from './settings'


export default class MainStore {
  settings = new Settings()

  @observable networkMap = new Map()
  @observable packets = []

  @observable filter = {
    query: '',
    channels: [],
  }

  @computed get networks() {
    return this.networkMap.values().sort(firstBy('name'))
  }

  @computed get transfers() {
    return flatMap(this.networks, network => network.transfers)
  }

  @action start() {
    const { nick, networks } = this.settings
    networks.forEach((props) => {
      const params = { ...toJS(props), nick, store: this }
      this.networkMap.set(props.server, new Network(params))
    })
  }

  addPacketSorted = binaryInsert(this.packets, firstBy('name').thenBy(p => p.bot.name).thenBy('number'))

  @action addPacket(packet) {
    this.addPacketSorted(packet)
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
}
