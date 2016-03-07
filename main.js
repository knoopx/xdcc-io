const path = require('path')
const electron = require('electron')

const { app, BrowserWindow } = electron

let win

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const WebpackDevServer = require('webpack-dev-server')
  const config = require(path.resolve('./webpack.config.js'))

  config.output.publicPath = 'http://localhost:8080/'
  config.entry.unshift('react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server')
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin())

  const compiler = webpack(config)
  const server = new WebpackDevServer(compiler, { hot: true, inline: true })
  server.listen(8080)
}

process.on('uncaughtException', console.log)

app.on('ready', () => {
  const { screen } = electron
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  win = new BrowserWindow({ width, height })
  win.on('unresponsive', () => { console.log('unresponsive!') })

  // win.loadURL(`file://${__dirname}/src/index.html?react_perf`)
  win.loadURL(`file://${__dirname}/src/index.html`)

  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools()
  }

  win.on('closed', () => {
    win = null
  })
})
