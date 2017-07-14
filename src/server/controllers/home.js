const express = require('express');
const path = require('path');

module.exports = (req, res) => {
  console.log('req', req);
  console.log('res', res);
  path.join(__dirname, '..', 'public', 'index.html');
};
