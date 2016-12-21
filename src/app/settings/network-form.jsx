import React from 'react'
import { autobind } from 'core-decorators'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { Row, Column, Divider } from 'ui/layout'

import ChannelList from './channel-list'

@autobind
@observer
export default class NetworkForm extends React.Component {
  @observable channelName = ''

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.addChannel(e.target.value)
      this.setChannelName('')
    }
  }

  @action setChannelName(name) {
    this.channelName = name
  }

  @action addChannel(name) {
    this.props.network.channels.push(name)
  }

  render() {
    const { network } = this.props

    return (
      <Column style={{ flex: 1 }}>
        <label style={{ display: 'flex', flexDirection: 'column', marginBottom: 8 }}>
          Name
          <input autoFocus value={network.name} onChange={(e) => { this.update({ name: e.target.value }) }} />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', marginBottom: 8 }}>
          Server
          <input value={network.server} onChange={(e) => { this.update({ server: e.target.value }) }} />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', marginBottom: 4 }}>
          Channels
          <input placeholder="Add new channel..." value={this.channelName} onChange={e => this.setChannelName(e.target.value)} onKeyPress={this.onKeyPress} />
        </label>

        <ChannelList network={network} />
      </Column>
    )
  }

  @action update(props) {
    Object.assign(this.props.network, props)
  }
}
