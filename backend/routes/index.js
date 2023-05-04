const { createUser, login } = require('../controllers/users');
const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();

const cards = require('./cards');
const error = require('./error');
const users = require('./users');

app.post('/signin', celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }), login);
  
  app.post('/signup', celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(regular),
      name: Joi.string().min(2).max(30),
    }),
  }), createUser);

router.use(cards);
router.use(users);
router.use('*', error);

module.exports = router;
