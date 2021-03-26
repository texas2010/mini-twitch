const Webpack = require('webpack');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = require('./src/config');

const webpackConfig = {
  entry: { main: ['./src/client/main.js'] },
  output: {
    path: config.distFolder,
    filename: '[name].[fullhash].js',
    publicPath: config.publicPath,
  },
  mode: config.isProd ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react-app'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new AssetsWebpackPlugin({ path: config.distFolder }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin()],
  },
};

if (config.hmrEnabled) {
  webpackConfig.plugins.push(new Webpack.HotModuleReplacementPlugin());
}

module.exports = webpackConfig;
