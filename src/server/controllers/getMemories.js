const express = require('express');
require('env2')('./config.env');
const { getMemories } = require('./../../database/db_get');

module.exports = (req, res) => {
  getMemories(1, (error, memories) => {
    if (error) return res(error);
    res.send(memories.rows);
  });
};
