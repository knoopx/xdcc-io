import React from 'react'
import { action } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Row, Column, Gutter } from 'ui/layout'
import Badge from 'ui/badge'
import theme from 'ui/theme'
import Indicator from 'ui/indicator'

@inject('manager')
@observer
export default class NetworkListItemChannel extends React.Component {
  @action
  onClick = () => {
    const { channel } = this.props
    this.props.manager.toggleChannel(channel)
  }

  render() {
    const { manager, channel } = this.props
    const style = manager.filter.channels.includes(channel) ? {
      color: 'white',
      backgroundColor: '#3187e1',
    } : {}

    return (
      <Row style={{ padding: '4px 16px', alignItems: 'center', ...style }} onClick={this.onClick}>
        <Indicator size={4} active={channel.isJoined} />
        <Gutter size={8} />
        <Column style={{ flex: 1, color: channel.isJoined ? null : theme.textMutedColor }}><small>{channel.name}</small></Column>
        <Badge>{channel.packets.length}</Badge>
      </Row>
    )
  }
}
