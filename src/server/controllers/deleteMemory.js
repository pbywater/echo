const express = require('express');
require('env2')('./config.env');
const { deleteMemory } = require('./../../database/db_delete');

module.exports = (req, res) => {
  deleteMemory(req.body.id, (error, response) => {
    if (error) return res(error);
  });
};