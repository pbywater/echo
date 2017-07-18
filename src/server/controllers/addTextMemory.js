const express = require('express');
const bodyParser = require('body-parser');
require('env2')('./config.env');
const { createMemory } = require('./../../database/db_create');

module.exports = (req, res) => {
  createMemory('test', req.body, 'text_only', (error, response) => {
    if (error) return res.status(500).send(error);

    res.status(200).send('ok');
  });
};
