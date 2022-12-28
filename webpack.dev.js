const webpack = require('webpack')
const { merge } = require('webpack-merge')

const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  // watchOptions: {
  //   poll: true,
  //   aggregateTimeout: 100,
  // },
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              // this need to use import class names from css file
              // modules: true,
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      LOGGER: true,
      REDUX_DEVTOOLS: true,
    }),
  ],
})
