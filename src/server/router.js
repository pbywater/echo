const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
require('env2')('./config.env');

const router = express.Router();

const environment = require('env2');

environment('./config.env');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true,
}));

const session = cookieSession({
  name: 'authenticated',
  secret: process.env.SESSION_SECRET,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    signed: true,
    maxAge: 1 * 60 * 60 * 1000, // 1 hour
  },
});

router.use(session);

router.get('/', require('./controllers/home.js'));
router.get('/login', require('./controllers/sign-up.js'));
router.post('/logout', require('./controllers/logout.js'));
router.post('/memory-input-text', require('./controllers/addTextMemory.js'));
router.post('/memory-input-photo', require('./controllers/signS3.js'));
router.post('/add-new-user', require('./controllers/addNewUser.js'));
router.post('/login', require('./controllers/login.js'));
router.get('/sign-s3', require('./controllers/signS3.js'));
router.route('/memories')
  .get(require('./controllers/getMemories.js'))
  .delete(require('./controllers/deleteMemory.js'));
router.route('/likes')
  .get(require('./controllers/getLikes.js'))
  .post(require('./controllers/updateLikes.js'));

module.exports = router;
