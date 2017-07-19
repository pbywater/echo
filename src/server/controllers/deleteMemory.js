const aws = require('aws-sdk');
require('env2')('./config.env');
const { deleteMemory } = require('./../../database/db_delete');
const { getMemoryUrlById } = require('./../../database/db_get');

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
aws.config.update({ accessKeyId: process.env.AWSAccessKeyId, secretAccessKey: process.env.AWSSecretKey, signatureVersion: 'v4', region: 'eu-west-2' });
const s3 = new aws.S3();

module.exports = (req, res) => {
  getMemoryUrlById(req.body.id, (error, response) => {
    console.log('response', response);
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
