const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');

const app = express();

const commentsByPostId = {}; // static data - replacing actual DB for demo purposes

app.use(cors());
app.use(bodyParser.json());

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');

  const { content } = req.body;

  // look up id key see if comments list exists already, if not initialize
  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, date: new Date(), comment: content });

  commentsByPostId[req.params.id] = comments; // replacing with new array
  res.status(201).json(commentsByPostId);
});

app.get('/posts/:id/comments', (req, res) => {
  const comments = commentsByPostId[req.params.id];

  if (comments) {
    res.status(200).json(comments);
  } else {
    res.status(400).json('No such post exists.');
  }
});

app.listen(4001, () => {
  console.log('Listening on port 4001');
});
