const express = require('express');
const bodyParser = require('body-parser');
require('env2')('./config.env');
const { createMemory } = require('./../../database/db_create');
const signs3 = require('./signS3');

module.exports = (req, res) => {
  // signs3(req, res)

};
