const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true,
}));

const sessionSecret = '3294r4whasuodifhd13urde80sufj138ryt9-gu538re9ghvisujela4hrsf4rue5r89';

const session = cookieSession({
  name: 'authenticated',
  secret: sessionSecret,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    signed: true,
    maxAge: 1 * 60 * 60 * 1000, // 1 hour
  },
});

router.use(session);

router.get('/', require('./controllers/home.js'));
router.post('/logout', require('./controllers/logout.js'));
router.post('/memory-input-text', require('./controllers/addTextMemory.js'));
router.post('/login', require('./controllers/login.js'));
router.route('/memories')
  .get(require('./controllers/getMemories.js'))
  .delete(require('./controllers/deleteMemory.js'));

module.exports = router;
