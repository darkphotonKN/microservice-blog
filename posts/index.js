const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');

const app = express();

const posts = {}; // static data - replacing actual DB for demo purposes

app.use(cors());
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.post('/posts', (req, res) => {
  const id = randomBytes(4).toString('hex'); // random 4 byte id and convert it to a hexidecimal (no letters)
  const { title } = req.body;
  posts[id] = { id, title };
  res
    .status(201)
    .send(
      `post: ${JSON.stringify(
        posts[id]
      )} was successfully created! \nposts: ${JSON.stringify(posts)}`
    );
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
