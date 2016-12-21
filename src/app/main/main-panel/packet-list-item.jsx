import React from 'react'
import { observer } from 'mobx-react'


import { Row, Column, Gutter } from 'ui/layout'
import theme from 'ui/theme'
import { humanFileSize } from 'support'


@observer
export default class extends React.Component {
  static propTypes = {
    packet: React.PropTypes.object.isRequired,
  }

  onClick() {
    this.props.packet.bot.requestPacket(this.props.packet.number)
  }

  render() {
    const { packet } = this.props

    return (
      <Row style={{ padding: '8px 16px', borderBottom: `1px solid ${theme.borderColor}`, cursor: 'pointer' }} onClick={this.onClick}>
        <Column style={{ width: '40px', textAlign: 'right' }}>
          {`${packet.downloadCount}x`}<small>{`#${packet.number}`}</small></Column>
        <Gutter />
        <Column style={{ flex: 1 }}>
          <Row style={{ display: 'flex', flexDirection: 'row' }}><strong>{packet.name}</strong></Row>
          <small>{packet.bot.name} - {packet.channels.map(c => c.name).join(', ')} - {packet.bot.network.name}</small>
        </Column>
        <Gutter />
        <Column style={{ flex: 'none' }}>
          {humanFileSize(packet.size)}
        </Column>
      </Row>
    )
  }
}
