const express = require('express');
require('env2')('./config.env');
const { deleteMemory } = require('./../../database/db_delete');

module.exports = (req, res) => {
  deleteMemory(req.body.id, (error, response) => {
    console.log('response is ', response);
    console.log('id is ', req.body.id);
    if (error) return res(error);
  });
};
