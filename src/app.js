const express = require('express');
const { create, list } = require('./controllers/artist');

const app = express();
app.use(express.json());

// app.get('*', (req, res) => {
//   res.status(200).json({ message: 'Hello World!' });
// });

app.post('/artists', create);
app.get('/artists', list);

module.exports = app;
