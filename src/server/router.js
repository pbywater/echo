const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true,
}));

router.get('/', require('./controllers/home.js'));
router.post('/memory-input-text', require('./controllers/addTextMemory.js'));
router.post('/login', require('./controllers/login.js'));
router.route('/memories')
  .get(require('./controllers/getMemories.js'))
  .delete(require('./controllers/deleteMemory.js'));

module.exports = router;
