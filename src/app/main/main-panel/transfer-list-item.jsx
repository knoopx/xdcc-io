import React from 'react'
import { observer } from 'mobx-react'
import { autobind } from 'core-decorators'

import { Row, Column, Gutter } from 'ui/layout'
import { humanFileSize } from 'support'

import ProgressBar from 'ui/progress-bar'
import Button from 'ui/button'
import StopIcon from 'react-icons/lib/fa/times-circle'

@autobind
@observer
export default class TransferListItem extends React.Component {
  abort() {
    this.props.transfer.abort()
  }

  render() {
    const { file, status, received, size, progress } = this.props.transfer
    return (
      <Row style={{ flex: 1, padding: '8px 16px' }}>
        <Column style={{ flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <strong>{file}</strong>
          </div>
          <Row>
            <small>{status}</small>
          </Row>
        </Column>
        <Gutter />
        <Column style={{ flex: 'none', alignItems: 'flex-end', minWidth: '200px' }} />
        <Gutter />
        <Column style={{ alignSelf: 'center' }}>
          <Row>
            <Column style={{ flex: 'none', alignSelf: 'center' }}>
              {`${humanFileSize(received)} (${Math.round(progress * 100)}%)`}
            </Column>
            <Gutter />
            <Column style={{ alignSelf: 'center' }}>
              <ProgressBar progress={progress} />
            </Column>
            <Gutter />
            <Column style={{ flex: 'none', alignSelf: 'center' }}>
              {humanFileSize(size)}
            </Column>
          </Row>
        </Column>
        <Gutter size={20} />
        <Column style={{ flex: 'none', alignSelf: 'center' }}>
          <Button onClick={this.abort}><StopIcon size={16} /></Button>
        </Column>
      </Row>
    )
  }
}
