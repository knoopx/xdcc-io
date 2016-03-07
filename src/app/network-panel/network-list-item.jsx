import React from 'react'
import { observer } from 'mobx-react'
import { Row, Column, Gutter } from 'ui/layout'
import Badge from 'ui/badge'
import theme from 'ui/theme'
import Indicator from 'ui/indicator'

import Channel from './network-list-item-channel'

@observer
export default class NetworkListItem extends React.Component {
  render() {
    const { network } = this.props
    return (
      <Column style={{ flex: 1 }}>
        <Row style={{ alignItems: 'center', padding: '8px 16px', borderBottom: `1px solid ${theme.borderColor}` }}>
          <Indicator active={network.isConnected} />
          <Gutter size={8} />
          <Row style={{ flex: 1 }}>
            <strong style={{ color: network.isConnected ? null : theme.textMutedColor }}>{network.name}</strong>
          </Row>
          <Badge>{network.packets.length}</Badge>
        </Row>
        {network.channels.map(channel => (
          <Channel key={channel.key} channel={channel} />
        ))}
      </Column>
    )
  }
}
