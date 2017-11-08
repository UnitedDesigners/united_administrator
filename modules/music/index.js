const getUrls = require('get-urls');
const spotifyUri = require('spotify-uri');

const spotify = require('./spotify');
const queries = require('./queries');

function saveSong(e, pool, redis) {
  const urls = getUrls(e.text);

  if (urls.size > 0) {
    urls.forEach((url) => {
      const track = spotifyUri.parse(url);
      if (track.type === 'track' && track.id) {
        pool.query(queries.initialInsert, [e.text, e.user])
          .then(result => Promise.all([result.rows[0].id, spotify.getMetadata(track.id, redis)]))
          .then(arr => pool.query(
            queries.updateSpotify,
            [
              arr[0],
              arr[1].body.name,
              arr[1].body.album.name,
              arr[1].body.artists[0].name,
              arr[1].body.id,
            ],
          ))
          .catch(err => console.log('error', err));
      }
    });
  }
}

module.exports = (events, pool, redis) => {
  pool.query(queries.init).catch((e) => { throw e; });

  events.on('message', (e) => {
    if (e.channel === 'C2H8CD141' && e.text.indexOf('spotify') !== -1) {
      saveSong(e, pool, redis);
    }
  });
};
