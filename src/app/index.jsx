import React from 'react'
import DevTools from 'mobx-react-devtools'
import { inject, observer } from 'mobx-react'

import { Row, Divider } from 'ui/layout'

import Main from './main'
import Settings from './settings'

@inject('store')
@observer
export default class RootContainer extends React.Component {
  renderRoute() {
    const { store } = this.props
    if (store.networks.length > 0) {
      return <Main />
    }
    return <Settings />
  }

  render() {
    return (
      <Row style={{ flex: 1 }}>
        {this.renderRoute()}
        <DevTools />
      </Row>
    )
  }
}
