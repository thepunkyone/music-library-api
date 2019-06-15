const express = require('express');

const albumRouter = express.Router({ mergeParams: true });
const { create } = require('../controllers/album');

albumRouter.post('/', create);

module.exports = albumRouter;
