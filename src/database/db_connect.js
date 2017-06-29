const { Pool } = require('pg');
const url = require('url');

const environment = require('env2');

environment('./config.env');

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL missing from .env.');
}

const params = url.parse(process.env.DATABASE_URL);
const [username, password] = params.auth.split(':');

const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.DB_MAX_CONNECTIONS || 20,
  ssl: (params.hostname !== 'localhost'),
};

if (username) { options.user = username; }
if (password) { options.password = password; }

module.exports = new Pool(options);
