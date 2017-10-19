const slack = require('slack');
const messages = require('./message');

module.exports = (events) => {
  events.on('team_join', (event) => {
    slack.im.open({
      token: process.env.SLACK_OAUTH_TOKEN,
      user: event.user.id,
    }).then((response) => {
      for (let i = 0; i < messages.length; i += 1) {
        slack.chat.postMessage({
          token: process.env.SLACK_OAUTH_TOKEN,
          channel: response.channel.id,
          ...messages[i],
        });
      }
    }).then(() => {
      slack.chat.postMessage({
        token: process.env.SLACK_OAUTH_TOKEN,
        channel: 'G54L3EBPF',
        text: `@${event.user.name} just joined! I've sent them the welcome message.`,
        parse: 'full',
      });
    });
  });

  // TODO: Detect first introduction message, send message to #applications
};
