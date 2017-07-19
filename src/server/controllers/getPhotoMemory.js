const aws = require('aws-sdk');
require('env2')('./config.env');

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

module.exports = (req, res) => {
  aws.config.update({ accessKeyId: process.env.AWSAccessKeyId, secretAccessKey: process.env.AWSSecretKey, signatureVersion: 'v4', region: 'eu-west-2' });
  const s3 = new aws.S3();

  const s3Params = {
    Bucket: S3_BUCKET_NAME,
    Key: req.query.memoryUrl,
  };

  s3.getSignedUrl('getObject', s3Params, (err, url) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    res.write(url);
    res.end();
  });
};
