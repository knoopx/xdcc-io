import React from 'react'

import { inject, observer } from 'mobx-react'

import Badge from 'ui/badge'
import theme from 'ui/theme'
import { Row, Column, Divider, Gutter } from 'ui/layout'
import ClearIcon from 'react-icons/lib/fa/times-circle'

import NetworkList from './network-list'

@inject('store')

@observer
export default class NetworkPanel extends React.Component {
  onClearSelected() {
    this.props.store.clearChannels()
  }

  renderClearButton() {
    return (
      <Row style={{ padding: 10, backgroundColor: '#fbfbd8' }} onClick={this.onClearSelected}>
        <ClearIcon />
        <Gutter />
        <span>Clear selection</span>
      </Row>
    )
  }

  render() {
    return (
      <Column style={{ flex: 2 }}>
        <Row style={{ padding: '8px 16px', backgroundColor: theme.backgroundColor }}>
          <Column style={{ flex: 1 }}><strong>Networks</strong></Column>
          <Badge>{this.props.store.packets.length}</Badge>
        </Row>
        <Divider />
        {this.props.store.filter.channels.size > 0 && this.renderClearButton()}
        <NetworkList />
      </Column>
    )
  }
}
