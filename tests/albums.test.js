const mongoose = require('mongoose');
const Artist = require('../src/models/artist');
const Album = require('../src/models/album');

describe('/albums', () => {
  let artist;

  beforeEach((done) => {
    Artist.create({
      name: 'The Jesus and Mary Chain',
      genre: 'Rock',
    }, (error, document) => {
      artist = document;
      done();
    });
  });

  afterEach((done) => {
    mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  describe('POST /artists/:artistId/albums', () => {
    it('creates a new album for a given artist', (done) => {
      chai.request(server)
        .post(`/artists/${artist._id}/albums`, () => {
        })
        .send({
          name: 'Psychocandy',
          year: 1985,
        })
        .end((error, res) => {
          expect(error).to.equal(null);
          expect(res.status).to.equal(201);

          Album.findById(res.body._id, (err, album) => {
            expect(err).to.equal(null);
            expect(album.name).to.equal('Psychocandy');
            expect(album.year).to.equal(1985);
            expect(album.artist).to.eql(artist._id);
            done();
          });
        });
    });

    it('returns a 404 and does not create an album if the artist does not exist', (done) => {
      chai.request(server)
        .post('/artists/1234/albums')
        .send({
          name: 'Psychocandy',
          year: 1985,
        })
        .end((error, res) => {
          expect(error).to.equal(null);
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('The artist could not be found.');

          Album.find({}, (err, albums) => {
            expect(err).to.equal(null);
            expect(albums).to.have.lengthOf(0);
            done();
          });
        });
    });
  });

  describe('with albums in the database', () => {
    let albums;
    beforeEach((done) => {
      Promise.all([
        Album.create({ name: 'Psychocandy', year: 1985, artist: { _id: artist._id } }),
        Album.create({ name: 'Darklands', year: 1987, artist: { _id: artist._id } }),
        Album.create({ name: 'Automatic', year: 1989, artist: { _id: artist._id } }),
      ]).then((documents) => {
        albums = documents;
        done();
      });
    });

    describe('GET /artists/:artistId/albums', () => {
      it('gets all album records for the artist', (done) => {
        chai.request(server)
          .get(`/artists/${artist._id}/albums`)
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res.status).to.equal(200);
            expect(res.body).to.have.lengthOf(3);

            res.body.forEach((album) => {
              const expected = albums.find(a => a._id.toString() === album._id);
              expect(album.name).to.equal(expected.name);
              expect(album.year).to.equal(expected.year);
              expect(album.artist).to.equal(artist._id.toString());
            });
            done();
          });
      });

      it('returns a 404 if artist doesn\'t exist', (done) => {
        chai.request(server)
          .get('/artists/1234/albums')
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The artist could not be found.');
            done();
          });
      });
    });

    describe('GET /artists/:artistId/albums/:albumId', () => {
      it('gets album record by id', (done) => {
        const album = albums[0];
        chai.request(server)
          .get(`/artists/${artist._id}/albums/${album._id}`)
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal(album.name);
            expect(res.body.year).to.equal(album.year);
            done();
          });
      });

      it('returns a 404 if album doesn\'t exist', (done) => {
        chai.request(server)
          .get(`/artists/${artist._id}/albums/1234`)
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The album could not be found.');
            done();
          });
      });
    });

    describe('PATCH /artists/:artistId/albums/:albumId', () => {
      it('updates album name by id', (done) => {  
        const album = albums[0];
        chai.request(server)
          .patch(`/artists/${artist._id}/albums/${album._id}`)
          .send({ name: 'Honey\'s Dead' })
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res.status).to.equal(200);
            Album.findById(album._id, (err, updatedAlbum) => {
              expect(updatedAlbum.name).to.equal('Honey\'s Dead');
              expect(updatedAlbum.year).to.equal(album.year);
            });
            done();
          });
      });

      it('updates album year by id', (done) => {
        const album = albums[0];
        chai.request(server)
          .patch(`/artists/${artist._id}/albums/${album._id}`)
          .send({ year: 1988 })
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res.status).to.equal(200);
            Album.findById(album._id, (err, updatedAlbum) => {
              expect(updatedAlbum.year).to.equal(1988);
              expect(updatedAlbum.name).to.equal(album.name);
            });
            done();
          });
      });

      it('returns a 404 if album doesn\'t exist', (done) => {
        chai.request(server)
          .patch(`/artists/${artist._id}/albums/1234`)
          .send({ year: 2007 })
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The album could not be found.');
            done();
          });
      });
    });

    describe('DELETE /artists/:artistId/album/:albumId', () => {
      it('deletes album record by id', (done) => {
        const album = albums[0];
        chai.request(server)
          .delete(`/artists/${artist._id}/albums/${album._id}`)
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res.status).to.equal(204);
            Album.findById(album._id, (error, updatedAlbum) => {
              expect(error).to.equal(null);
              expect(updatedAlbum).to.equal(null);
            });
            done();
          });
      });

      it('returns a 404 if the album doesn\'t exist', (done) => {
        chai.request(server)
          .delete(`/artists/${artist._id}/albums/1234`)
          .end((err, res) => {
            expect(err).to.equal(null);
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The album could not be found.');
            done();
          });
      });
    });
  });
});
