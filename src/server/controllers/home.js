const express = require('express');
const path = require('path');

module.exports = (req, res) => {
  // path.join(__dirname, '..', 'public', 'index.html');
  res.sendFile('/public/index.html');
};
