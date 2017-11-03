const slack = require('slack');

function report(req, res) {
  slack.chat.postMessage({
    token: process.env.SLACK_OAUTH_TOKEN,
    channel: 'G57SW7KEY',
    text: '',
    attachments: [
      {
        fallback: req.body.text,
        title: 'Report:',
        text: req.body.text,
        footer: `#${req.body.channel_name}`,
        ts: Date.now() / 1000,
        actions: [
          {
            name: 'flag_report',
            text: ':triangular_flag_on_post:',
            type: 'button',
            value: req.body.user_id,
          },
        ],
      },
    ],
    parse: 'full',
  }).then(() => {
    res.send('Sent! Thanks for your anonymous report. Administrators will receive the message and channel.');
  }).catch(err => console.error(err));
}

function raccoon(req, res) {
  if (req.body.text.indexOf('#') !== -1) {
    slack.chat.postMessage({
      token: process.env.SLACK_OAUTH_TOKEN,
      channel: req.body.channel_id,
      text: `:raccoon: ${req.body.text}`,
      parse: 'full',
    }).then(() => {
      res.status(200).end();
    }).catch(err => console.error(err));
  } else {
    res.send('/raccoon must include a channel name');
  }
}

function playlists(req, res) {
  slack.chat.postMessage({
    token: process.env.SLACK_OAUTH_TOKEN,
    channel: req.body.channel_id,
    text: 'Here are the United Designers\' Spotify playlists:<https://open.spotify.com/user/t00ny45/playlist/0BDL72PDgsplHxkuEmtmIf| ><https://open.spotify.com/user/thegeorgesumpster/playlist/1WOVXO4f974PG2FHREJUeS| ><https://open.spotify.com/user/123721037/playlist/7Jwmfyvu8uxhB3i0eEZ265| ><https://open.spotify.com/user/123721037/playlist/7EmbbFmb1qB6geRwaM1Nrs| >',
  }).then(() => {
    res.status(200).end();
  }).catch(err => console.error(err));
}

module.exports = (router) => {
  router.post('/slack/report', report);
  router.post('/slack/raccoon', raccoon);
  router.post('/slack/playlists', playlists);
};
