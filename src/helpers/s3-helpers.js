require('env2')('./config.env');

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

function getUrl(key) {
  return url.format({
    protocol: 'https',
    host: 's3.eu-west-2.amazonaws.com',
    pathname: `/$${S3_BUCKET_NAME}/${encodeURIComponent(key)}`,
  });
}
