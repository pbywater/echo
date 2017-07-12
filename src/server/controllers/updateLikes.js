const express = require('express');
require('env2')('./config.env');
const { updateLikes } = require('./../../database/db_update');

module.exports = (req, res) => {
  updateLikes(req.body.numLikes, req.body.memoryId, (error, response) => {
    if (error) {
      if (error) console.log('update error is', error);
    }
    res.send(res.rows);
  });
};
