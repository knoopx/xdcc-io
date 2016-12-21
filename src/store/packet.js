import { observable, action } from 'mobx'

export default class Packet {
  downloadCount = 0;
  size = 0;
  @observable channels = []

  constructor(props) {
    Object.assign(this, props)
    this.key = [props.bot.network.name, props.bot.name, props.number].join('/')
  }

  @action addChannel(channel) {
    if (!this.channels.includes(channel)) {
      this.channels.push(channel)
    }
  }
}
