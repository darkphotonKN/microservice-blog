const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.get('/event-bus', (req, res) => {
  res.status(200).json({ value: 'Event bus!' });
});

app.listen(4002, () => console.log('Listening on port 4002'));
