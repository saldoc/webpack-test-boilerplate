const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'assets/scripts/[name].bundle.js',
    chunkFilename: 'assets/scripts/[id].bundle.js'
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...']
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/styles/[name].bundle.css',
      chunkFilename: 'assets/styles/[id].bundle.css'
    })
  ]
});
