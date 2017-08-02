const aws = require('aws-sdk');
require('env2')('./config.env');

const s3init = () => {
  aws.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
    signatureVersion: 'v4',
    region: 'eu-west-2',
  });
  const s3 = new aws.S3();
  return s3;
};


module.exports = {
  s3init,
};
