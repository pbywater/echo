const express = require('express');

module.exports = (req, res) => {
  res.clearCookie('name').redirect('/sign-up');
};
