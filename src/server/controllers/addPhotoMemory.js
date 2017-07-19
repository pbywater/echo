const { updatePhotoMemory } = require('./../../database/db_update');

module.exports = (req, res) => {
  updatePhotoMemory('test', req.body.tag, req.body.heading, req.body.imageId, (err, res) => {
    if (err) return err;
  });
};
