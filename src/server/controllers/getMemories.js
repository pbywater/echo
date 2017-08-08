const { getMemories } = require('./../../database/db_get');

module.exports = (req, res) => {
  getMemories(req.session.name, (error, memories) => {
    if (error) {
      res.send(error);
      return;
    }
    res.send(memories.rows);
  });
};
