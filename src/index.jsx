import React from 'react'
import ReactDOM from 'react-dom'
import { useStrict } from 'mobx'
import { Provider } from 'mobx-react'
import { AppContainer } from 'react-hot-loader'

import './index.css'

import Store from './store'

useStrict(process.env.NODE_ENV !== 'production')

function render() {
  const App = require('./app').default
  ReactDOM.render(
    <AppContainer>
      <Provider store={new Store()}>
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
