const router = require('express').Router();

const cards = require('./cards');
const error = require('./error');
const users = require('./users');

router.use(cards);
router.use(users);
router.use('*', error);

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

module.exports = router;
