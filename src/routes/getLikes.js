const express = require('express');
require('env2')('./config.env');
const { getLikes } = require('./../database/db_get');
const bodyParser = require('body-parser');

const app = express.Router();

app.use(bodyParser());

module.exports = [
  app.get('/likes/memoryId/:memoryId', (req, res) => {
    const memoryId = req.params.memoryId;
    console.log(memoryId);
    getLikes(memoryId, (error, response) => {
      if (error) {
        if (error) console.log('getLikes error is', error);
      }
      console.log('res is ', response);
      res.send(response);
    });
  }),
];
