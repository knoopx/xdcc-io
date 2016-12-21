import React from 'react'
import { action } from 'mobx'
import { observer, inject } from 'mobx-react'

import Input from 'ui/input'
import theme from 'ui/theme'
import { Row, Column, Divider, Gutter } from 'ui/layout'

import PacketList from './packet-list'
import TransferList from './transfer-list'
import SearchPanel from './search-panel'

@inject('store')
@observer
export default class MainPanel extends React.Component {
  render() {
    return (
      <Column style={{ flex: 10 }}>
        <SearchPanel />

        <Divider />

        <Row style={{ flex: 9 }}>
          <PacketList />
        </Row>

        <Divider />

        <Row style={{ flex: 3 }}>
          <TransferList />
        </Row>
      </Column>
    )
  }
}
