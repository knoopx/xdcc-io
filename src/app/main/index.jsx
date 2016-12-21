import React from 'react'

import { Row, Divider } from 'ui/layout'

import MainPanel from './main-panel'
import NetworkPanel from './network-panel'

export default class App extends React.Component {
  render() {
    return (
      <Row style={{ flex: 1 }}>
        <NetworkPanel />
        <Divider direction="vertical" />
        <MainPanel />
      </Row>
    )
  }
}
