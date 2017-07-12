const express = require('express');
require('env2')('./config.env');
const { getLikes } = require('./../../database/db_get');


module.exports = (req, res) => {
  const memoryId = req.params.memoryId;
  getLikes(memoryId, (error, response) => {
    if (error) {
      if (error) console.log('getLikes error is', error);
    }
    const num = response.toString();
    res.send(num);
  });
};
