import React from 'react'
import ReactDOM from 'react-dom'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader'

import './index.css'

import Manager from './stores/manager'

useStrict(process.env.NODE_ENV !== 'production')

const manager = new Manager([
  {
    name: 'Abjects',
    server: 'irc.abjects.net',
    channels: ['#moviegods', '#[rm]rolys-movies', '#elitemusic', '#xdcc', '#krautz-warez', '#convicts-xdcc', '#beast-xdcc', '#TMD-MOVIEZ', '#tmd-tvrips', '#ZtvLand'],
  }, {
    name: 'SceneP2P',
    server: 'irc.scenep2p.net',
    channels: ['#THE.SOURCE'],
  },
  {
    name: 'Rizon',
    server: 'irc.rizon.net',
    channels: ['#elitewarez'],
  },
  {
    name: 'FroZyn',
    server: 'irc.frozyn.net',
    channels: ['#BLACKMARKET-WAREZ', '#blackmarket-music'],
  }, {
    name: 'Criten',
    server: 'irc.criten.net',
    channels: ['#ELITEWAREZ', '#MASTERWAREZ', '#0DAY-MP3S', '#THE-FUTURE'],
  }, {
    name: 'Abandoned-IRC',
    server: 'irc.abandoned-irc.net',
    channels: ['#zombie-warez'],
  }, {
    name: 'MircPhantom',
    server: 'irc.mircphantom.net',
    channels: ['#abstract', '#FIRESTORM-MP3S'],
  }, {
    name: 'IAREC',
    server: 'irc.iarec.net',
    channels: ['#ultra-warez'],
  }, {
    name: 'AlphaIRC',
    server: 'irc.alphairc.com',
    channels: ['#MASTERWAREZ', '#HIDD3N-ZAUBERBUDE'],
  }, {
    name: 'Under',
    server: 'irc.under.net',
    channels: ['#all-metal'],
  }, {
    name: 'XeroLogic',
    server: 'irc.xerologic.net',
    channels: ['#MP3', '#WAREZ'],
  },

])

window.manager = manager

function render() {
  const App = require('./app').default
  ReactDOM.render(
    <AppContainer>
      <Provider manager={manager}>
        <App />
      </Provider>
    </AppContainer>
    , document.querySelector('#root'),
  )
}

if (module.hot) {
  module.hot.accept('./app', () => {
    render()
  })
}

render()
