const express = require('express');
const { create } = require('./controllers/artist');

const app = express();
app.use(express.json());

app.get('*', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

app.post('/artists', create);

module.exports = app;
