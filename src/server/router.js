const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
require('env2')('./config.env');

const { checkSignIn } = require('./../helpers/helpers.js');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true,
}));

const session = cookieSession({
  name: 'authenticated',
  secret: process.env.SESSION_SECRET,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true, //we'll need to change this to https when we officially launch on heroku
    signed: true,
    maxAge: 1 * 60 * 60 * 1000, // 1 hour
  },
});

router.use(session);

router.get('/', require('./controllers/home.js'));
router.post('/logout', checkSignIn, require('./controllers/logout.js'));
router.post('/memory-input-text', checkSignIn, require('./controllers/addTextMemory.js'));
router.route('/memory-input-photo')
  .post(checkSignIn, require('./controllers/assetCreateUrl.js'))
  .put(checkSignIn, require('./controllers/addPhotoMemory.js'))
  .get(checkSignIn, require('./controllers/assetGetUrl.js'));
router.post('/add-new-user', require('./controllers/addNewUser.js'));
router.route('/login')
  .get(require('./controllers/sign-up.js'))
  .post(require('./controllers/login.js'));
router.get('/sign-s3', checkSignIn, require('./controllers/assetCreateUrl.js'));
router.route('/memories')
  .get(checkSignIn, require('./controllers/getMemories.js'))
  .delete(checkSignIn, require('./controllers/assetDeleteUrl.js'));
router.route('/likes')
  .get(checkSignIn, require('./controllers/getLikes.js'))
  .post(checkSignIn, require('./controllers/updateLikes.js'));
router.get('/verify/:token/:username', require('./controllers/verifyEmail.js'));

module.exports = router;
