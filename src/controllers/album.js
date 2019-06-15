const Album = require('../models/album');

exports.create = (req, res) => {
  const album = new Album({
    name: req.body.name,
    year: req.body.year,
    artist: {
      _id: req.params.artistId,
    },
  });

  album.save().then(() => {
    res.status(201).json(album);
  });
};
