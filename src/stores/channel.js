import { observable, computed, action, map } from 'mobx'
import { uniq, flatMap } from 'lodash'

export default class Channel {
  @observable bots = []
  @observable isJoined = false

  constructor(props) {
    Object.assign(this, props)
    this.key = [this.network.name, this.name].join('/')
  }

  @action addBot(bot) {
    if (!this.bots.includes(bot)) {
      this.bots.push(bot)
    }
  }

  @computed get packets() {
    return uniq(flatMap(this.bots, b => b.packets))
  }
}
