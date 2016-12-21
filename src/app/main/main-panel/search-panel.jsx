import React from 'react'
import { action } from 'mobx'
import { observer, inject } from 'mobx-react'


import Input from 'ui/input'
import theme from 'ui/theme'
import { Row, Column, Gutter } from 'ui/layout'

@inject('store')

@observer
export default class SearchPanel extends React.Component {
  @action onChange(e) {
    this.props.store.setQuery(e.target.value)
  }

  render() {
    return (
      <Row style={{ padding: '8px 16px', alignItems: 'center', backgroundColor: theme.backgroundColor }}>
        <Column><strong>Packets</strong></Column>
        <Gutter />
        <Column style={{ flex: 1 }}>
          <Input onChange={this.onChange} />
        </Column>
      </Row>
    )
  }
}
