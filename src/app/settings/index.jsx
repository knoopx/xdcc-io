import React from 'react'
import { inject, observer } from 'mobx-react'

import PlusIcon from 'react-icons/fa/plus'

import { Row, Column, Gutter, Spacer, Divider } from 'ui/layout'
import Button from 'ui/button'
import theme from 'ui/theme'

import NetworkForm from './network-form'
import NetworkList from './network-list'

@inject('store')
@observer
export default class Settings extends React.Component {
  render() {
    const { store } = this.props
    const { settings } = store

    return (
      <Column style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Column style={{ width: '50%' }}>
          <Row style={{ flex: 1, alignItems: 'center' }}>
            <h3>Networks</h3>
            <Spacer />
            <Column>
              <Button onClick={settings.addNetwork}><PlusIcon /></Button>
            </Column>
          </Row>

          <Row style={{ flex: 1 }}>
            <Column style={{ flex: 1 }}>
              {settings.networks.length > 0 ? <NetworkList /> : <em style={{ color: theme.textMutedColor }}>No networks</em>}
            </Column>
            <Divider direction="vertical" style={{ margin: '0 16px' }} />
            <Column style={{ flex: 1 }}>
              {settings.activeNetwork && <NetworkForm network={settings.activeNetwork} />}
            </Column>
          </Row>

          <h3>Other</h3>

          <label style={{ display: 'flex', flexDirection: 'column', marginBottom: 16 }}>
            Nickname
            <input value={settings.nick} onChange={(e) => { settings.setNick(e.target.value) }} />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column' }}>
            Download path
            <input value={settings.downloadPath} onChange={(e) => { settings.setDownloadPath(e.target.value) }} />
          </label>

          <Gutter size={32} />

          <Button style={{ fontSize: 18, fontWeight: 'bold', lineHeight: 2 }} onClick={store.start}>Start</Button>
        </Column>
      </Column>
    )
  }
}
