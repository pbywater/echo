const express = require('express');

const router = express.Router();

router.get('/', require('./controllers/home.js'));
router.get('/memories', require('./controllers/getMemories.js'));
router.delete('/memories', require('./controllers/deleteMemory.js'));

module.exports = router;
