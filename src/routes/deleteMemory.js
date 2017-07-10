const express = require('express');
require('env2')('./config.env');
const { deleteMemory } = require('./../database/db_delete');
const bodyParser = require('body-parser');

const app = express.Router();


module.exports = [
  app.delete('/memories', (req, result) => {
    console.log('hello', result.data);
    // const test = JSON.stringify(result);
    deleteMemory(result, (err, res) => {
      if (err) {
        console.log('error is ', err);
        return err;
      }
      // result.send(res.rows);
      res.send('DELETE request to homepage');
    });
  }),
];
