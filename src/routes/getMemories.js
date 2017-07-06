const express = require('express');
require('env2')('./config.env');
const { getMemories } = require('./../database/db_get');

const app = express.Router();

module.exports = [
  app.get('/memories', (req, result) => {
    getMemories(1, (err, res) => {
      // 1 hard coded in at the moment.
      // We will later add the userId here to get the relevant memories.
      if (err) {
        return err;
      }
      result.send(res.rows);
    });
  }),
];
