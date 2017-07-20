const { deleteMemory } = require('./../../database/db_delete');

module.exports = (req, res) => {
  deleteMemory(req.body.id, (error, response) => {
    if (error) return res.status(500).send(error);
    res.status(200).send('ok');
  });
};
