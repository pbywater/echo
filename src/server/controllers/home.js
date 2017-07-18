const express = require('express');
const path = require('path');

module.exports = (req, res) => {
  res.sendFile('../../../public/index.html', { root: __dirname });
};
