const slack = require('slack');

function constructMessage(form) {
  return [
    {
      fallback: 'New Application Recieved!',
      title: 'Application to United Designers',
      callback_id: form.id,
      fields: [
        {
          title: 'Name',
          value: form.name,
          short: true,
        }, {
          title: 'Email',
          value: form.email,
          short: true,
        }, {
          title: 'Field',
          value: form.field,
          short: true,
        }, {
          title: 'Location',
          value: form.location,
          short: true,
        }, {
          title: 'Portfolio',
          value: form.portfolio,
          short: true,
        }, {
          title: 'Comments',
          value: form.comments,
          short: false,
        },
      ],
      actions: [
        {
          name: 'application_response',
          text: 'Accept',
          style: 'primary',
          type: 'button',
          value: true,
        },
        {
          name: 'application_response',
          text: 'Deny',
          style: 'danger',
          type: 'button',
          value: false,
        },
      ],
    },
  ];
}

module.exports = formData => new Promise((resolve, reject) => {
  slack.chat.postMessage({
    token: process.env.SLACK_OAUTH_TOKEN,
    channel: 'applications',
    text: '',
    attachments: constructMessage(formData),
  }, (err) => {
    if (err) { reject(err); }
    resolve();
  });
});
