const { createMemory } = require('./../../database/db_create');

module.exports = (req, res) => {
  createMemory(req.session.id, req.body, 'text_only', 'null', (error, response) => {
    if (error) return res.status(500).send(error);
    res.status(200).send('ok');
  });
};
