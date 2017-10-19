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

module.exports = (router) => {
  router.post('/slack/report', report);
  router.post('/slack/raccoon', raccoon);
};
