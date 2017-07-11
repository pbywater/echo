const express = require('express');
require('env2')('./config.env');
const { deleteMemory } = require('./../../database/db_delete');

module.exports = (req, result) => {
  deleteMemory(req.body.id, (err, res) => {
    if (err) {
      return err;
    }
  });
};
