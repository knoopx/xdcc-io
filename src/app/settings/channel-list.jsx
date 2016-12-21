import React from 'react'
import { observable, computed, action } from 'mobx'
import { autobind } from 'core-decorators'
import { inject, observer } from 'mobx-react'
import RemoveIcon from 'react-icons/lib/fa/times-circle'

import { Row, Column, Gutter, Divider } from 'ui/layout'
import List from 'ui/list'
import theme from 'ui/theme'

@inject('store')
@autobind
@observer
export default class ChannelList extends React.Component {
  @action removeChannel(channel) {
    this.props.network.channels.remove(channel)
  }

  renderItem(channel) {
    return (
      <Row style={{ flex: 1, alignItems: 'center', padding: '4px 8px' }}>
        <Column style={{ flex: 1 }}>
          <Row>{channel}</Row>
        </Column>
        <Column>
          <RemoveIcon onClick={(e) => { e.stopPropagation(); this.removeChannel(channel) }} />
        </Column>
      </Row>
    )
  }

  render() {
    return (
      <List style={{ flex: 1, border: '1px solid #dee2e6' }} items={this.props.network.channels} renderItem={this.renderItem} />
    )
  }
}
