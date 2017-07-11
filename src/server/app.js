const express = require('express');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router');

app.use(express.static('public'));
app.use('/', router);
app.use(bodyParser());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Echo listening on port ${port}!`);
});
