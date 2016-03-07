import React from 'react'
import { inject, observer } from 'mobx-react'

import theme from 'ui/theme'
import { Row, Column, Divider, Gutter } from 'ui/layout'
import { List } from 'ui/list'

import TransferListItem from './transfer-list-item'

@inject('manager')
@observer
export default class TransferList extends React.Component {
  render() {
    return (
      <Column style={{ flex: 1 }}>
        <Row style={{ padding: '8px 16px', backgroundColor: theme.backgroundColor }}>
          <strong>Transfers</strong>
        </Row>
        <Divider />
        <Row style={{ flex: 1 }}>
          <List style={{ overflow: 'auto' }}>
            {this.props.manager.transfers.map((transfer, index) =>
              <TransferListItem key={index} transfer={transfer} onClick={this.props.onClick} />,
            )}
          </List>
        </Row>
      </Column>
    )
  }
}
