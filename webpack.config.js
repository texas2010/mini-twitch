const config = require('./src/config');

const webpackConfig = {
  entry: { main: ['./src/client/main.js'] },
  output: {
    path: config.distFolder,
    filename: 'main.bundle.js',
    publicPath: '/assets/',
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
    ],
  },
};

module.exports = webpackConfig;
