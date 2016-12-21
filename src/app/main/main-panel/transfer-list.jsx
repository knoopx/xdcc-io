import React from 'react'
import { inject, observer } from 'mobx-react'

import theme from 'ui/theme'
import { Row, Column, Divider, Gutter } from 'ui/layout'
import List from 'ui/list'

import TransferListItem from './transfer-list-item'

@inject('store')
@observer
export default class TransferList extends React.Component {
  renderItem(transfer, index) {
    return <TransferListItem key={index} transfer={transfer} />
  }

  render() {
    return (
      <Column style={{ flex: 1 }}>
        <Row style={{ padding: '8px 16px', backgroundColor: theme.backgroundColor }}>
          <strong>Transfers</strong>
        </Row>
        <Divider />
        <Row style={{ flex: 1 }}>
          <List style={{ flex: 1, overflow: 'auto' }} items={this.props.store.transfers} renderItem={this.renderItem} />
        </Row>
      </Column>
    )
  }
}
