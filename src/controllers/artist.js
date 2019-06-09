const Artist = require('../models/artist');

exports.create = (req, res) => {
  const artist = new Artist({
    name: req.body.name,
    genre: req.body.genre,
    members: req.body.members,
    yearFormed: req.body.yearFormed,
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

exports.findByYearAndGenre = (req, res) => {
  const { year, genres } = req.params;
  const { sort, limit } = req.query;

  Artist.find()
    .where('yearFormed').gt(year)
    .where('genre').in(JSON.parse(genres))
    .sort({ yearFormed: sort })
    .limit(Number(limit))
    .exec((err, artists) => res.status(202).json(artists));
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
      res.sendStatus(204);
    }
  });
};
