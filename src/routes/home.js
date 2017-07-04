const express = require('express');
const path = require('path');

const app = express.Router();

module.exports = [
  app.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/..` + '/public/index.html'));
  }),
];
