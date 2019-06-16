const express = require('express');

const albumRouter = express.Router({ mergeParams: true });
const { create, list, find } = require('../controllers/album');

albumRouter.post('/', create);
albumRouter.get('/', list);
albumRouter.get('/:albumId', find);

module.exports = albumRouter;
