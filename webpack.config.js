const path = require('path')
const webpack = require('webpack')
const { dependencies } = require('./package.json')

module.exports = {
  target: 'electron-renderer',
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval',
  entry: [
    'source-map-support/register',
    './src',
  ],

  plugins: [
    new webpack.ExternalsPlugin('commonjs', Object.keys(dependencies)),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [require('postcss-smart-import'), require('precss'), require('autoprefixer')],
        context: __dirname,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'renderer.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json', '.css'],
  },
  module: {
    loaders: [
      {
        test: /\.css/,
        loaders: ['style-loader', 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss-loader'],
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve('./src'),
          path.resolve('./node_modules/react-mobx-virtual-list'),
          path.resolve('./node_modules/react-icons'),
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
}
