const express = require('express');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/..` + '/public/index.html'));
});

app.use(express.static('public'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Echo listening on port ${port}!`);
});
