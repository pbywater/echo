const express = require('express');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const router = require('./router');

app.use(express.static('public'));
app.use('/', router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Echo listening on port ${port}!`);
});
