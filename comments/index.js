const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

const commentsByPostId = {}; // static data - replacing actual DB for demo purposes

app.use(cors());
app.use(bodyParser.json());

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');

  const { content } = req.body;

  // look up id key see if comments list exists already, if not initialize
  const comments = commentsByPostId[req.params.id] || [];
  const date = new Date();

  // adding status property 'pending' before moderation
  comments.push({ id: commentId, date, content, status: 'pending' });

  // replacing with new array
  commentsByPostId[req.params.id] = comments; // "storing" to DB (in memory just for demo)

  // post request of the same post to the EVENT BUS!
  // type - type of event
  // data - the payload carried over to be saved
  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      date,
      postId: req.params.id,
      status: 'pending', // allows other services to know comment status is pending
    },
  });

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

app.post('/events', async (req, res) => {
  console.log('Recieved Event', req.body.type);

  const { type, data } = req.body;

  // handle the CommentModerated type of event
  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;
    // find matching post comments
    const comments = commentsByPostId[postId];
    // update specific comment's status
    const targetComment = comments.find((comment) => comment.id === id);

    targetComment.status = status;

    // now tell every other service that this update occured via the EVENT BUS
    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        postId,
        status,
        content,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on port 4001');
});
