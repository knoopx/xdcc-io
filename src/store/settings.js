import homeDir from 'home-dir'

import { observable, action, autorun } from 'mobx'

function load(key, defaultValue) {
  const json = localStorage.getItem(key)
  if (json) { return JSON.parse(json) }
  return defaultValue
}

function save(key, value) {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}


export default class SettingsStore {
  @observable activeNetwork;
  @observable nick = load('nick', 'io42');
  @observable downloadPath = load('downloadPath', homeDir('Downloads'))
  @observable networks = load('networks', [])

  constructor() {
    autorun(() => { save('nick', this.nick) })
    autorun(() => { save('downloadPath', this.downloadPath) })
    autorun(() => { save('networks', this.networks) })
  }

  @action setDownloadPath(value) {
    this.downloadPath = value
  }

  @action setNick(value) {
    this.nick = value
  }

  @action addNetwork() {
    this.setActiveNetwork(this.buildNetwork())
    this.networks.push(this.activeNetwork)
  }

  @action removeNetwork(network) {
    if (this.activeNetwork === network) {
      this.setActiveNetwork(null)
    }
    this.networks.remove(network)
  }

  @action setActiveNetwork(activeNetwork) {
    this.activeNetwork = activeNetwork
  }

  buildNetwork() {
    return {
      name: '',
      server: '',
      channels: [],
    }
  }
}
