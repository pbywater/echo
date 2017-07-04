const express = require('express');
require('env2')('./config.env');
const get = require('./../database/db_get');

const app = express.Router();

module.exports = [
  app.get('/getd3data', (req, res) => {
    get.memories(1, (err, res) => { // 1 hard coded in at the moment.
      if (err) {
        return err;
      }
      console.log(res.rows);
      res.send(res.rows);
    });
  }),
];
