import React from 'react'
import { inject, observer } from 'mobx-react'
import { Row } from 'ui/layout'

import NetworkListItem from './network-list-item'

@inject('manager')
@observer
export default class NetworkList extends React.Component {
  render() {
    return (
      <Row style={{ flex: 1, display: 'block', overflow: 'auto' }}>
        {this.props.manager.networks.map(network =>
          <NetworkListItem
            key={network.key}
            network={network}
          />,
        )}
      </Row>
    )
  }
}
