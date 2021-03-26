const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    // console.log(req);
    res.render('index', {});
  });
  return router;
};
