module.exports = [
  {
    text: 'Welcome to United Designers! Go ahead and update your profile with a picture of yourself and say hi in #introductions!',
    parse: 'full',
  },
  {
    text: 'To make sure that we remain an open and friendly environment, we have a few rules for our community here:',
    attachments: [
      {
        fallback: 'Be nice – racism, sexism, and any other forms of bigotry will result in immediate removal from the group.',
        text: 'Be nice – racism, sexism, and any other forms of bigotry will result in immediate removal from the group.',
      },
      {
        fallback: 'Don’t use United Designers as a platform to advertise (job postings may be posted in #jobs).',
        text: 'Don’t use United Designers as a platform to advertise (job postings may be posted in <#C2D8Z0F46|jobs>).',
      },
      {
        fallback: 'Please keep professional channels professional and on-topic. If a conversation becomes too off-topic, move it to an appropriate channel.',
        text: 'Please keep professional channels professional and on-topic. If a conversation becomes too off-topic, move it to an appropriate channel.',
      },
    ],
  },
  {
    text: 'Here are a few of our professional channels:',
    attachments: [
      {
        fallback: '#design: The general design channel',
        title: '<#C4MR6TD9T|design>',
        text: 'The general design channel.',
      },
      {
        fallback: '#feedback-and-roasts: The general design channel',
        title: '<#C237ALERG|feedback-and-roasts>',
        text: 'Post your work here to get feedback and critiques.',
      },
      {
        fallback: 'Other professional channels: #frontend, #inspiration, #how-to, #prototyping, #software, #jobs',
        text: 'Other professional channels: <#C37F1QTB2|frontend>, <#C1T80RU86|inspiration>, <#C5U3TQS76|accessibility>, <#C2A4UDC9Z|how-to>, <#C3RBYFVMG|prototyping>, <#C1YC4PS8L|software>, <#C2D8Z0F46|jobs>.',
      },
    ],
  },
  {
    text: 'Here are a few of our other channels:',
    attachments: [
      {
        fallback: '#chit-chat: This is our general purpose chat channel (warning: occasionally semi-nsfw)',
        title: '<#C4Y3GAYK1|chit-chat>',
        text: 'This is our general purpose chat channel (warning: occasionally semi-nsfw).',
      },
      {
        fallback: 'Other channels: #safe-space, #vent, #films-and-tv, #nerd-cave, #music, #finance, #bayarea-events',
        text: 'Other channels: <#C3VFC9HT6|safe-space>, <#C466HLB0X|vent>, <#C4W3TURD5|films-and-tv>, <#C26FVA9SN|nerd-cave>, <#C2H8CD141|music>, <#C5HJRL5U5|finance>, <#C23NJCEF7|bayarea-events>, and more.',
      },
    ],
  },
];
