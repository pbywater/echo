const aws = require('aws-sdk');
require('env2')('./config.env');

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

const { s3init } = require('./../../helpers/helpers');

const s3 = s3init();

module.exports = (req, res) => {
  const s3Params = {
    Bucket: S3_BUCKET_NAME,
    Key: req.query.memoryUrl,
  };

  s3.getSignedUrl('getObject', s3Params, (err, url) => {
    if (err) {
      console.log(err);
      return res.status(500).send('failed to generate asset URL');
    }
    res.write(url);
    res.end();
  });
};
