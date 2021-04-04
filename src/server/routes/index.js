const express = require('express');

const Twitch = require('../twitch');
const { isAlphanumeric } = require('../../../utils');

const router = express.Router();

module.exports = () => {
  router.get('/', async (req, res) => {
    const { search } = req.query;
    if (typeof search === 'string') {
      if (search && search.length >= 4 && search.length <= 25) {
        if (isAlphanumeric(search)) {
          const isUsernameExist = await Twitch.isUsernameExist(search);
          if (isUsernameExist.hasOwnProperty('exist')) {
            if (isUsernameExist.exist) {
              return res.render('index', {
                username: search,
                usernameExistMessage: 'Success! We will show result!',
              });
            }
            return res.render('index', {
              username: search,
              warningMessage: '* Username is not exist in the Twitch.',
            });
          }
          return res.render('index', {
            username: search,
            warningMessage: isUsernameExist.error,
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
