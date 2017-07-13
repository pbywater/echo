const express = require('express');
require('env2')('./config.env');
const { getMemories } = require('./../../database/db_get');

module.exports = (req, res) => {
  getMemories(1, (error, memories) => {
    if (error) {
      res.send(error);
      return;
    }
    res.send(memories.rows);
  });
};
