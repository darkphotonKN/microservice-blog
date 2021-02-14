const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crpto');

const app = express();

const posts = []; // static data - replacing actual DB for demo purposes

app.get('/posts', (req, res) => {});

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex'); // random 4 byte id and convert it to a hexidecimal (no letters)
  const { title } = req.body;
  post[id] = { id, title };
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
