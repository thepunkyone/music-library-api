const express = require('express');
const { create, list, find, update, remove, findByYearAndGenre } = require('./controllers/artist');

const app = express();
app.use(express.json());

app.post('/artists', create);
app.get('/artists', list);
app.get('/artists/:artistId', find);
app.get('/artists/formedAfter/:year/genres/:genres', findByYearAndGenre);
app.patch('/artists/:artistId', update);
app.delete('/artists/:artistId', remove);

module.exports = app;
