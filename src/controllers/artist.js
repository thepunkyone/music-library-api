const Artist = require('../models/artist');

exports.create = (req, res) => {
  const artist = new Artist({
    name: req.body.name,
    genre: req.body.genre,
  });

  artist.save().then(() => {
    res.status(201).json(artist);
  });
};

exports.list = (req, res) => {
  Artist.find().then((artists) => {
    res.status(200).json(artists);
  });
};

exports.find = (req, res) => {
  Artist.findById(req.params.artistId, (err, artist) => {
    if (artist === undefined) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      res.status(200).json(artist);
    }
  });
};

exports.update = (req, res) => {
  Artist.findById(req.params.artistId, (err, artist) => {
    if (artist === undefined) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      artist.set(req.body).save();
      res.status(200).json(artist);
    }
  });
};

exports.remove = (req, res) => {
  Artist.findByIdAndDelete(req.params.artistId, (err, artist) => {
    if (artist === undefined) {
      res.status(404).json({ error: 'The artist could not be found.' });
    } else {
      res.status(204);
    }
  });
};
