const express = require('express');
const bodyParser = require('body-parser');
require('env2')('./config.env');
const { createMemory } = require('./../database/db_create');

const app = express.Router();

app.use(bodyParser());

module.exports = [
  app.post('/memory-input-text', (req, result) => {
    createMemory(req.body, 'text_only', (err, res) => {
      // 1 hard coded in at the moment.
      // We will later add the userId here to get the relevant memories.
      if (err) {
        return err;
      }
      // setTimeout(() => {
      //   result.redirect('/');
      // }
      //   , 4500);
    });
  }),
];
