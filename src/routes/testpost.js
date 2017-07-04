const express = require('express');
const path = require('path');
const post = require('./../database/db_post');


const app = express.Router();

module.exports = [
  app.get('/testpost', (req, res) => {
    const newMemory = {};
    newMemory.username = 'test';
    newMemory.heading = 'testpost';
    newMemory.tag = 'testpost';
    newMemory.memory = 'testpost';
    newMemory.mediaType = 'text_only';

    post.memory(newMemory, (err) => {
      if (err) {
        return err;
      }
    });
    res.redirect('/');
  }),
];
