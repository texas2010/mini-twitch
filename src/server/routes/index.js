const express = require('express');

const { isAlphanumeric } = require('../../../utils');

const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    const { search } = req.query;
    console.log('Search', search);
    if (typeof search === 'string') {
      if (search && search.length >= 4 && search.length <= 25) {
        if (isAlphanumeric(search)) {
          // need to check username. is username exist from twitch?
          // if yes, show result. if no. inform them, username is not exist
          return res.render('index', {
            username: search,
          });
        }
        return res.render('index', {
          username: search,
          warningMessage: '* Username must only contain alphanumeric characters.',
        });
      }
      return res.render('index', {
        username: search,
        warningMessage: '* Username must be between 4 and 25 characters.',
      });
    }
    res.render('index');
  });
  return router;
};
