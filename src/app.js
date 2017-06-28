const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/..' + '/public/index.html'))
})

app.use(express.static('public'));

app.listen(process.env.PORT || 5000, () => {
  console.log('Echo listening on port 5000!')
})
