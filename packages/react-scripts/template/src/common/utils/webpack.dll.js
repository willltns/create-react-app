const path = require('path')
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    vendor: [
      'qs',
      'axios',
      'react',
      'react-dom',
      'scheduler',
      'redux',
      'react-redux',
      'redux-saga',
      'react-router-dom',
      'connected-react-router',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dll'),
    filename: '[name].[contenthash:8].js',
    library: '[name]',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, '../dll', '[name]-manifest.json'),
    }),
    new AssetsPlugin({
      filename: 'assets.json',
      path: path.resolve(__dirname, '../dll'),
    }),
  ].filter(Boolean),
}
