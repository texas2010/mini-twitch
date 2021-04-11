const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const webpackAssets = require('express-webpack-assets');

const Twitch = require('./twitch');
const config = require('../config');
const routes = require('./routes');

Twitch.setAccessToken();

module.exports = () => {
  const app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../../public')));

  if (config.isProd) {
    app.use(config.publicPath, express.static(config.distFolder));
  } else {
    const { createProxy } = require('./hmr');
    app.use(config.publicPath, createProxy());
  }

  app.use(
    webpackAssets(path.join(__dirname, '../../dist/webpack-assets.json'), {
      devMode: process.env.NODE_ENV !== 'production',
    })
  );

  // Routes
  app.use('/', routes());

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  return app;
};
