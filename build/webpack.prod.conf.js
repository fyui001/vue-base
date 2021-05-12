'use strict'

const path = require('path')
const baseConfig = require('./webpack.base.conf')
const { merge } = require('webpack-merge')

const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    path: resolve('prod')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'stylus-loader',
        ],
      },
      {
        test: /\.scss/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          },
        ],
      },
    ],
  }
})
