const express = require('express');
require('env2')('./config.env');
const { deleteMemory } = require('./../database/db_delete');
const bodyParser = require('body-parser');

const app = express.Router();

app.use(bodyParser());

module.exports = [
  app.delete('/memories', (req, result) => {
    deleteMemory(req.body.id, (err, res) => {
      if (err) {
        return err;
      }
    });
  }),
];
