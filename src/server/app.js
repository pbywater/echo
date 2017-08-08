const express = require('express');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router');

app.use('/', router);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use((req, res) => {
  res.status(404).redirect('/');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Echo listening on port ${port}!`);
});
