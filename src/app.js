const express = require('express');
const { create, list, find, update, remove } = require('./controllers/artist');

const app = express();
app.use(express.json());

app.post('/artists', create);
app.get('/artists', list);
app.get('/artists/:artistId', find);
app.patch('/artists/:artistId', update);
app.delete('/artists/:artistId', remove);

module.exports = app;
