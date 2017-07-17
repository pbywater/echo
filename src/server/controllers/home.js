const express = require('express');
const path = require('path');

module.exports = (req, res) => {
  // res.sendFile(`${__dirname}public` + 'index.html');
  console.log(__dirname);
  res.sendFile('../../../public/index.html', { root: __dirname });
};
