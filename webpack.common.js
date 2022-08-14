const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const pages = [
  { name: 'index', scripts: ['common'] },
  { name: 'homepage', scripts: ['common', 'app'] },
];

const styleGuides = [{ name: 'button', scripts: ['common'] }];

module.exports = {
  entry: {
    app: './app/assets/scripts/App.ts',
    common: './app/assets/scripts/Common.ts'
  },
  output: {
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]'
        }
      },
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript']
          }
        }
      },
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
          options: {
            pretty: true
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: './app/assets/images', to: 'assets/images' }]
    }),
    new ESLintPlugin({
      extensions: ['.tsx', '.ts', '.js'],
      exclude: 'node_modules',
      context: 'app'
    })
  ].concat(
    pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `./app/views/${page.name}.pug`,
          filename: `${page.name}.html`,
          chunks: page.scripts,
          minify: false
        })
    ),
    styleGuides.map(
      (styleGuide) =>
        new HtmlWebpackPlugin({
          template: `./app/views/style-guides/${styleGuide.name}.pug`,
          filename: `style-guide-${styleGuide.name}.html`,
          chunks: styleGuide.scripts,
          minify: false
        })
    )
  )
};
