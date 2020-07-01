/* eslint-env node */

const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { version } = require('./package.json')

const serverPublic = path.join(__dirname, 'server', 'public')

module.exports = {
  entry: [
    './client/index.js'
  ],
  output: {
    path: serverPublic,
    filename: 'bundle.js',
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { context: './client', from: '*.html' },
        { context: './client', from: '*.css' }
      ]
    }),
    new HtmlWebpackPlugin({
      template: './client/index.html',
      version
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: serverPublic
  },
  mode: 'production',
  performance: {
    hints: false
  }
}
