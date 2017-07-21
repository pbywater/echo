require('env2')('./config.env');

const { deleteMemory } = require('./../../database/db_delete');
const { getMemoryById } = require('./../../database/db_get');
const { s3init } = require('./../../helpers/helpers');

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
const s3 = s3init();

module.exports = (req, res) => {
  getMemoryById(req.session.id, req.body.id, (error, response) => {
    if (error) return error;

    const params = {
      Bucket: S3_BUCKET_NAME,
      Delete: {
        Objects: [
          {
            Key: response,
          },
        ],
      },
    };

    s3.deleteObjects(params, (err, data) => {
      if (err) console.log(err);
      else console.log(data);
    });
  });
  deleteMemory(req.body.id, (error, response) => {
    if (error) return res.status(500).send(error);
    res.status(200).send('ok');
  });
};
