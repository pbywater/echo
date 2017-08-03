const { updatePhotoMemory } = require('./../../database/db_update');

module.exports = (req, res) => {
  updatePhotoMemory(1, req.body.tag, req.body.heading, req.body.imageId,
    (error, response) => {
      if (error) return res.status(500).send(error);
      res.status(200).send('ok');
    });
};
