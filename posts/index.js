const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

const posts = {}; // static data - replacing actual DB for demo purposes

app.use(cors());
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex'); // random 4 byte id and convert it to a hexidecimal (no letters)
  const { title } = req.body;
  posts[id] = { id, title }; // "storing" to DB (in memory just for demo)

  // post request of the same post to the EVENT BUS!
  // type - type of event
  // data - the payload carried over to be saved
  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: {
      id,
      title,
    },
  });

  res
    .status(201)
    .send(
      `post: ${JSON.stringify(
        posts[id]
      )} was successfully created! \nposts: ${JSON.stringify(posts)}`
    );
});

app.post('/events', (req, res) => {
  console.log('Recieved Event', req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
