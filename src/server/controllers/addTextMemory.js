const { createMemory } = require('./../../database/db_create');

module.exports = (req, res) => {
  createMemory(req.cookies.name, req.body, 'text_only', (error, response) => {
    if (error) return res(error);
    setTimeout(() => {
      res.redirect('/');
    }
        , 4500);
  });
};
