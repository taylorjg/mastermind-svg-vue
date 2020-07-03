/* eslint-env node */

const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const WorkerPlugin = require('worker-plugin')

const path = require('path')
const { version } = require('./package.json')

const SERVER_PUBLIC = path.join(__dirname, 'server', 'public')

module.exports = {
  entry: './src/index.js',
  output: {
    path: SERVER_PUBLIC,
    filename: 'bundle.js',
    globalObject: '(typeof self != \'undefined\' ? self : this)'
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { context: './src', from: '*.html' },
        { context: './src', from: '*.css' }
      ]
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      version
    }),
    new VueLoaderPlugin(),
    new WorkerPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: SERVER_PUBLIC
  },
  mode: 'production',
  performance: {
    hints: false
  }
}
