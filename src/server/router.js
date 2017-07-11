const express = require('express');

const router = express.Router();

router.get('/', require('./controllers/home.js'));
router.route('/memories')
  .get(require('./controllers/getMemories.js'))
  .delete(require('./controllers/deleteMemory.js'));

module.exports = router;
