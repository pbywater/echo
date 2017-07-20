const express = require('express');
const bodyParser = require('body-parser');
require('env2')('./config.env');
const { createMemory } = require('./../../database/db_create');

module.exports = (req, res) => {
  createMemory(req.session.name, req.body, 'text_only', (error, response) => {
    if (error) return res(error);
    setTimeout(() => {
      res.redirect('/');
    }
        , 4500);
  });
};
