const express = require('express');

const artistRouter = express.Router();
const { create, list, find, update, remove, findByYearAndGenre } = require('../controllers/artist');

artistRouter.post('/', create);
artistRouter.get('/', list);
artistRouter.get('/:artistId', find);
artistRouter.get('/formedAfter/:year/genre/:genre', findByYearAndGenre);
artistRouter.patch('/:artistId', update);
artistRouter.delete('/:artistId', remove);

module.exports = artistRouter;
