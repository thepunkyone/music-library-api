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

exports.list = (req, res) => {
  const { artistId } = req.params;

  Artist.findById(artistId, (err, artist) => {
    if (artist) {
      Album.find({ artist: artistId }).then((albums) => {
        res.status(200).json(albums);
      });
    } else {
      res.status(404).send({ error: 'The artist could not be found.' });
    }
  });
};

exports.find = (req, res) => {
  const { albumId } = req.params;

  Album.findById(albumId, (err, album) => {
    if (album) {
      res.status(200).json(album);
    } else {
      res.status(404).send({ error: 'The album could not be found.' });
    }
  });
};
