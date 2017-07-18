const express = require('express');
const aws = require('aws-sdk');
require('env2')('./config.env');

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

module.exports = (req, res) => {
  aws.config.update({ accessKeyId: process.env.AWSAccessKeyId, secretAccessKey: process.env.AWSSecretKey, signatureVersion: 'v4', region: 'eu-west-2' });
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET_NAME,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`,
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
};
