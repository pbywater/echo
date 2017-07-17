const express = require('express');

module.exports = (req, res) => {
  req.session = null;
  res.redirect('/sign-up');
};
