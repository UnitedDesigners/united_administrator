const tiny = require('tiny-json-http');

function auth(redis) {
  return redis.get('spotifyAuth').then((result) => {
    if (result === null) {
      return tiny.post({
        url: 'https://accounts.spotify.com/api/token',
        data: { grant_type: 'client_credentials' },
        headers: {
          Authorization: `Basic ${process.env.SPOTIFY_AUTH_STRING}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((response) => {
        redis.set('spotifyAuth', response.body.access_token, 'EX', response.body.expires_in);
        return response.body.access_token;
      }).catch((err) => {
        console.error(err);
      });
    }

    return result;
  });
}

module.exports = {
  getMetadata: (id, redis) => auth(redis).then(token => tiny.get({
    url: `https://api.spotify.com/v1/tracks/${id}`,
    headers: { Authorization: `Bearer ${token}` },
  })).catch((err) => {
    console.error(err);
  }),
};
