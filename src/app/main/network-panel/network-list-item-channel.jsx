import React from 'react'
import { action } from 'mobx'

import { inject, observer } from 'mobx-react'
import { Row, Column, Gutter } from 'ui/layout'
import Badge from 'ui/badge'
import theme from 'ui/theme'
import Indicator from 'ui/indicator'

@inject('store')

@observer
export default class NetworkListItemChannel extends React.Component {
  onClick() {
    const { channel } = this.props
    this.props.store.toggleChannel(channel)
  }

  render() {
    const { store, channel } = this.props
    const style = store.filter.channels.includes(channel) ? {
      color: 'white',
      backgroundColor: '#3187e1',
    } : {}

    return (
      <Row style={{ padding: '4px 16px', alignItems: 'center', cursor: 'pointer', ...style }} onClick={this.onClick}>
        <Indicator size={4} active={channel.isJoined} />
        <Gutter size={8} />
        <Column style={{ flex: 1, color: channel.isJoined ? null : theme.textMutedColor }}><small>{channel.name}</small></Column>
        <Badge>{channel.packets.length}</Badge>
      </Row>
    )
  }
}
