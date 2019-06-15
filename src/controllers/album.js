const Album = require('../models/album');
const Artist = require('../models/artist');

exports.create = (req, res) => {
  const { artistId } = req.params;
  const album = new Album({
    name: req.body.name,
    year: req.body.year,
    artist: {
      _id: artistId,
    },
  });

  Artist.findById(artistId, (err, artist) => {
    if (artist) {
      album.save().then(() => {
        res.status(201).json(album);
      });
    } else {
      res.status(404).send({ error: 'The artist could not be found.' });
    }
  });
};
