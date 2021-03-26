const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const httpProxy = require('http-proxy');
const webpackConfig = require('../../webpack.config.js');
const config = require('../config');

exports.startWds = () => {
  if (config.hmrEnabled) {
    Object.keys(webpackConfig.entry).forEach((name) => {
      webpackConfig.entry[name] =
        typeof webpackConfig.entry[name] === 'string'
          ? [webpackConfig.entry[name]]
          : webpackConfig.entry[name];

      webpackConfig.entry[name] = [
        'webpack/hot/dev-server',
        `webpack-dev-server/client?http://localhost:${config.wdsPort}`,
        ...webpackConfig.entry[name],
      ];
    });
  }

  const compiler = Webpack(webpackConfig);

  const watching = compiler.watch(
    {
      ignored: /node_modules/,
    },
    () => {
      console.log('Bundling...');
    }
  );

  // this code will stop error of ConcurrentCompilationError: You ran Webpack twice.
  watching.close(() => {});

  const bundler = new WebpackDevServer(compiler, {
    publicPath: config.publicPath,
    hot: config.hmrEnabled,
    sockHost: `http://localhost:${config.wdsPort}${config.publicPath}`,
    quiet: false,
    noInfo: true,
    stats: {
      colors: true,
    },
  });

  bundler.listen(config.wdsPort, 'localhost', () => {
    console.log('Bundling project, please wait...');
  });
  return bundler;
};

exports.createProxy = () => {
  const proxy = httpProxy.createProxyServer();
  return (req, res) =>
    proxy.web(req, res, { target: `http://localhost:${config.wdsPort}${config.publicPath}` });
};
