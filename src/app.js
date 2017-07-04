const express = require('express');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static('public'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Echo listening on port ${port}!`);
});
