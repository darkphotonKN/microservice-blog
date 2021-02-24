/**
 * THIS SERVICE ALLOWS POST / COMMENTS SERVICE TO STOP WORKING
 * YET ALLOW OUR APP TO STILL RUN
 */

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// storing post data, replacing a DB for demo purposes
const posts = {};

const handleEvent = (type, data) => {
  // initial post creation
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  // initial comment creation
  if (type === 'CommentCreated') {
    const { id, content, date, postId, status } = data; // status is a new property to check if comment is moderated
    const post = posts[postId];
    post.comments.push({ id, content, date, status });
  }

  // when any comment updates after moderation
  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id); // find the comment to update
    comment.status = status; // update to "Approved" or "Rejected"
    comment.content = content;
  }
};

app.get('/posts', (req, res) => {
  res.json(posts);
});

// every event that is posted will also all post to this end point
app.post('/events', (req, res) => {
  /* posts to this endpoint will all contain this info in the body under this format:
  {
    type: 'PostCreated',
    data: {
      id: 121312,
      title: 'mytitle'
    }
  }
  */

  const { type, data } = req.body;

  handleEvent(type, data);

  console.log(posts);

  res.status(201).send('Post was successful.');
});

app.post('/events', (req, res) => {
  console.log('Recieved Event', req.body.type);
  res.send({});
});

app.listen(4002, async () => {
  console.log('Server running on port 4002');
  // once server is online, get a list of all events since offline

  const events = await axios.get('http://localhost:4005/events');

  for (let event of events.data) {
    console.log('Processing event:', event.type);
    handleEvent(event.type, event.data);
  }
});
