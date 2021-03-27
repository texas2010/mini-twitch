const express = require('express');

const { isAlphanumeric } = require('../../../utils');

const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    // console.log(req);
    res.render('index', {});
  });
  return router;
};
