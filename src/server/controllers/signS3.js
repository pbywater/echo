const express = require('express');
const aws = require('aws-sdk');
require('env2')('./config.env');
// const createMemory = require('./../../database/db_create');

const cuid = require('cuid');
const { createMemory } = require('./../../database/db_create');

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

module.exports = (req, res) => {
  aws.config.update({ accessKeyId: process.env.AWSAccessKeyId, secretAccessKey: process.env.AWSSecretKey, signatureVersion: 'v4', region: 'eu-west-2' });
  const s3 = new aws.S3();
  const fileName = req.body.image;
  const fileType = req.body.image;
  const length = fileName.split('.').length;
  console.log('fileType', length);
  console.log(fileName.split('.')[length]);
  const fileKey = `${cuid()}.${fileType}`;
  const s3Params = {
    Bucket: S3_BUCKET_NAME,
    Key: fileKey,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };
  console.log('fileKey is ', fileKey);
  console.log('req body is', req.body);
  console.log('req query', req.query);
  // const selected = document.getElementById('photo-save').files.length > 0;
  // console.log('selected image', selected);

  // createMemory('test', req.)

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
