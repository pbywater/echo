const express = require('express');
const path = require('path');

module.exports = (req, res) => {
  // res.sendFile(`${__dirname}public` + 'index.html');
  res.sendFile(path.join(__dirname, '../../public', 'index1.html'));
};
