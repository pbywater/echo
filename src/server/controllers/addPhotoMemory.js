const express = require('express');
const bodyParser = require('body-parser');
require('env2')('./config.env');
const { createPhotoMemory } = require('./../../database/db_create');

module.exports = (req, res) => {
  createPhotoMemory('test', req.body, 'image', (error, response) => {
    if (error) return res(error);
    setTimeout(() => {
      res.redirect('/');
    }
        , 4500);
  });
};
