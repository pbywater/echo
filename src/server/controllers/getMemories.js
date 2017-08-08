const { getMemories } = require('./../../database/db_get');

module.exports = (req, res) => {
  getMemories('pipsab', (error, memories) => {
    if (error) {
      res.send(error);
      return;
    }
    res.send(memories.rows);
  });
};
