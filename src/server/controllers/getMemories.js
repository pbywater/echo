const express = require('express');
require('env2')('./config.env');
const { getMemories } = require('./../../database/db_get');

module.exports = (req, res) => {
  getMemories('test', (error, memories) => {
    if (error) {
      res.send(error);
      return;
    }
    res.send(memories.rows);
  });
};
