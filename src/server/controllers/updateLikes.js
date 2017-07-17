const express = require('express');
require('env2')('./config.env');
const { updateLikes } = require('./../../database/db_update');

module.exports = (req, res) => {
  updateLikes(req.body.numLikes, req.body.memoryId, (error, response) => {
    if (error) {
      console.error('getLikes error is', error);
      res.status(500).send(error);
      return;
    }
    res.send(res.rows);
  });
};
