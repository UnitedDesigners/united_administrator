module.exports = {
  init: 'CREATE TABLE IF NOT EXISTS music(id SERIAL PRIMARY KEY, message TEXT NOT NULL, slack_user TEXT NOT NULL, submitted_at TIMESTAMP DEFAULT NOW(), spotify_artist TEXT, spotify_album TEXT, spotify_song TEXT, spotify_uri TEXT)',
  initialInsert: 'INSERT INTO music(message, slack_user) VALUES($1, $2) RETURNING id',
  updateSpotify: 'UPDATE music SET spotify_song = $2, spotify_album = $3, spotify_artist = $4, spotify_uri = $5 WHERE id = $1',
};
