const express = require('express');
require('env2')('./config.env');
const { getLikes } = require('./../../database/db_get');


module.exports = (req, res) => {
  const memoryId = req.params.memoryId;
  getLikes(memoryId, (error, response) => {
    if (error) {
      console.error('getLikes error is', error);
      res.status(500).send(error);
      return;
    }
    const num = response.toString();
    res.send(num);
  });
};
