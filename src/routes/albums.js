const express = require('express');

const albumRouter = express.Router({ mergeParams: true });
const { create, list } = require('../controllers/album');

albumRouter.post('/', create);
albumRouter.get('/', list);

module.exports = albumRouter;
