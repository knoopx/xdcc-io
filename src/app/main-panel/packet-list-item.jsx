import React from 'react'
import { observer } from 'mobx-react'

import { ListItem } from 'ui/list'
import { Row, Column, Gutter } from 'ui/layout'
import { humanFileSize } from 'support/format'

@observer
export default class extends React.Component {
  static propTypes = {
    packet: React.PropTypes.object.isRequired,
  }

  onClick = () => {
    this.props.packet.bot.requestPacket(this.props.packet.number)
  }

  render() {
    const { packet } = this.props

    return (
      <ListItem onClick={this.onClick}>
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
      </ListItem>
    )
  }
}
