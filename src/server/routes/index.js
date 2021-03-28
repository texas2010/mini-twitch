const express = require('express');

const { isAlphanumeric } = require('../../../utils');

const Twitch = require('../twitch');

const router = express.Router();

module.exports = () => {
  router.get('/', async (req, res) => {
    console.log(Twitch);
    const { search } = req.query;
    if (typeof search === 'string') {
      if (search && search.length >= 4 && search.length <= 25) {
        if (isAlphanumeric(search)) {
          // need to check username. is username exist from twitch?
          // if yes, show result. if no. inform them, username is not exist
          const isUsernameExist = await Twitch.isUsernameExist(search);
          if (isUsernameExist && isUsernameExist.error) {
            return res.render('index', {
              username: search,
              warningMessage: isUsernameExist.error,
            });
          }
          if (isUsernameExist.isUsernameExist) {
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
