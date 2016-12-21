import React from 'react'
import { observable, computed } from 'mobx'
import { autobind } from 'core-decorators'
import { inject, observer } from 'mobx-react'
import RemoveIcon from 'react-icons/lib/fa/times-circle'

import { Row, Column, Gutter, Divider } from 'ui/layout'
import List from 'ui/list'
import theme from 'ui/theme'

@inject('store')
@autobind
@observer
export default class NetworkList extends React.Component {
  renderItem(network) {
    return (
      <Row style={{ flex: 1, alignItems: 'center', padding: '8px 16px' }}>
        <Column style={{ flex: 1 }}>
          <Row>{network.name || <em style={{ color: theme.textMutedColor }}>New network...</em>}</Row>
          <Row><small style={{ color: theme.textMutedColor }}>{network.server || 'irc.example.com'}</small></Row>
        </Column>
        <Column>
          <RemoveIcon onClick={(e) => { e.stopPropagation(); this.props.store.settings.removeNetwork(network) }} />
        </Column>
      </Row>
    )
  }

  onSelect(item) {
    this.props.store.settings.setActiveNetwork(item)
  }

  render() {
    const { settings } = this.props.store
    const { activeNetwork, networks } = settings

    return (
      <List selected={activeNetwork} items={networks} renderItem={this.renderItem} onSelect={this.onSelect} />
    )
  }
}
