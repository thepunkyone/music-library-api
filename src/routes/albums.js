const express = require('express');

const albumRouter = express.Router({ mergeParams: true });
const { create, list, find, update } = require('../controllers/album');

albumRouter.post('/', create);
albumRouter.get('/', list);
albumRouter.get('/:albumId', find);
albumRouter.patch('/:albumId', update);

module.exports = albumRouter;
