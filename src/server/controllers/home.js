const express = require('express');
const path = require('path');

module.exports = (req, res) => {
  if (req.session.name) {
    res.sendFile(path.join(__dirname, '../../..', 'public', 'index.html'));
  } else {
    res.sendFile(path.join(__dirname, '../../..', 'public', 'signup.html'));
  }
};
