const webpack = require('webpack')
const path = require('path')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = {
  context: __dirname,
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'public/assets'),
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   plugins: ['lodash'],
          //   presets: ['@babel/env', '@babel/react'],
          // },
        },
      },
      {
        test: /\.svg$|\.png|\.jpe?g|\.gif$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name]-[hash][ext][query]',
          publicPath: '/assets/',
        },
      },
      {
        test: /\.woff2?$|\.ttf$|\.eot$|\.otf$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name]-[hash][ext][query]',
          publicPath: '/assets/',
        },
      },
    ],
  },
  plugins: [
    new LodashModuleReplacementPlugin({
      cloning: true,
      coercions: true,
      collections: true,
      paths: true,
      shorthands: true,
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.PUBLIC_URL': '/',
    }),
    // new BundleAnalyzerPlugin(),
  ],
}
