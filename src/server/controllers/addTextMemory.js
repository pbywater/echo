const express = require('express');
const bodyParser = require('body-parser');
require('env2')('./config.env');
const { createMemory } = require('./../database/db_create');

module.exports = (req, res) => {
  createMemory(req.body, 'text_only', (error, response) => {
      // 1 hard coded in at the moment.
      // We will later add the userId here to get the relevant memories.
    if (error) return res(error);
    setTimeout(() => {
      res.redirect('/');
    }
        , 4500);
  });
};
