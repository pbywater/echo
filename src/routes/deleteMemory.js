const express = require('express');
require('env2')('./config.env');
const { deleteMemory } = require('./../database/db_delete');

const app = express.Router();

module.exports = [
  app.get('/delete', (req, result) => {
    console.log(result);
    deleteMemory(id, (err, res) => {
      if (err) {
        return err;
      }
      result.send(res.rows);
    });
  }),
];
