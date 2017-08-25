const path = require('path');

module.exports = (req, res) => {
  if (!req.session.id && !req.session.name) {
    res.sendFile(path.join(__dirname, '../../..', 'public', 'password_reset.html'));
  } else {
    res.redirect('/');
  }
};
