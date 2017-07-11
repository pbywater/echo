const express = require('express');
require('env2')('./config.env');
const { updateLikes } = require('./../database/db_update');
const bodyParser = require('body-parser');

const app = express.Router();

app.use(bodyParser());

module.exports = [
  app.get('/likes', (req, res) => {
    updateLikes(req.body.numLikes, (error, response) => {
      if (error) {
        if (error) return res(error);
      }
      res.send(res.rows);
    });
  }),
];
