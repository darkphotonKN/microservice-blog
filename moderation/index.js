/**
 * Service focused on moderation of comments
 */

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

// watching for events sent from our event broker (Event Bus service)
app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  // deal with the comment created type of event
  if (type === 'CommentCreated') {
    // check comment content for the word "covid"
    // if present status will be 'rejected'
    // if not present, status will become 'approved;
    const status = data.content.includes('covid') ? 'rejected' : 'approved';

    // post new comment after moderation
    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated', // CommentModerated instead of CommentCreated
      data: { ...data, status }, // update new status
    });
  }

  res.status(200).send({});
});

app.listen('4003', () => console.log('Listening on port 4003...'));
