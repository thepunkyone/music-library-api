const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: String,
  genre: String,
  members: Number,
  yearFormed: Number,
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
