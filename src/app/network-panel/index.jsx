import React from 'react'
import { action } from 'mobx'
import { inject, observer } from 'mobx-react'

import Badge from 'ui/badge'
import theme from 'ui/theme'
import { Row, Column, Divider, Gutter } from 'ui/layout'
import ClearIcon from 'react-icons/lib/fa/times-circle'

import NetworkList from './network-list'

@inject('manager')
@observer
export default class NetworkPanel extends React.Component {
  @action
  onClearSelected = () => {
    this.props.manager.clearChannels()
  }

  renderClearButton = () => (
    <Row style={{ padding: 10, backgroundColor: '#fbfbd8' }} onClick={this.onClearSelected}>
      <ClearIcon />
      <Gutter />
      <span>Clear selection</span>
    </Row>
  )

  render() {
    return (
      <Column style={{ flex: 2 }}>
        <Row style={{ padding: '8px 16px', backgroundColor: theme.backgroundColor }}>
          <Column style={{ flex: 1 }}><strong>Networks</strong></Column>
          <Badge>{this.props.manager.packets.length}</Badge>
        </Row>
        <Divider />
        {this.props.manager.filter.channels.size > 0 && this.renderClearButton()}
        <NetworkList />
      </Column>
    )
  }
}
