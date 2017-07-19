const express = require('express');
const aws = require('aws-sdk');
require('env2')('./config.env');

const connect = require('./../../database/db_connect.js');

const cuid = require('cuid');
const { createMemory } = require('./../../database/db_create');

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

module.exports = (req, res) => {
  aws.config.update({ accessKeyId: process.env.AWSAccessKeyId, secretAccessKey: process.env.AWSSecretKey, signatureVersion: 'v4', region: 'eu-west-2' });
  const s3 = new aws.S3();
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

  createMemory('test', newMemory, 'image', fileKey, (err, res) => {
    if (err) return err;
  });

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      key: s3Params.Key,
      signedRequest: data,
      url: `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`,
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
};
