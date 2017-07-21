const cuid = require('cuid');
require('env2')('./config.env');

const { createMemory } = require('./../../database/db_create');
const { s3init } = require('./../../helpers/helpers');

const s3 = s3init();

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

module.exports = (req, res) => {
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const fileKey = `${cuid()}.${fileName}`;
  const s3Params = {
    Bucket: S3_BUCKET_NAME,
    Key: fileKey,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };

  const newMemory = {
    memory_text: '',
    heading: '',
    tag: '',
  };

  createMemory('test', newMemory, 'image', fileKey, (err, response) => {
    if (err) return err;

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        console.log(err);
        return res.end();
      }
      const returnData = {
        imageId: response.rows[0].id,
        key: s3Params.Key,
        signedRequest: data,
        url: `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`,
      };
      res.write(JSON.stringify(returnData));
      res.end();
    });
  });
};
