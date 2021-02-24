const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

// store event history
const events = [];

app.get('/events', (req, res) => {
  res.status(200).json(events); // send user all events
});

app.post('/events', (req, res) => {
  const event = req.body;

  // post to other services
  axios.post('http://localhost:4000/events', event); // posts
  axios.post('http://localhost:4001/events', event); // comments
  axios.post('http://localhost:4002/events', event); // query
  axios.post('http://localhost:4003/events', event); // moderation

  // when anya service is down the event bus sends the events but those
  // services end up missing them
  // a fix would be to IMPLEMENT AN EVENT HISTORY

  // storing event records
  events.push(event);

  res.send({ status: 'OK' });
});

app.listen(4005, () => console.log('Listening on port 4005'));
