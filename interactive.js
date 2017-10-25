const application = require('./modules/applications');

module.exports = (app, pool) => {
  app.post('/slack/interactive', (req, res) => {
    if (req.body.token === process.env.SLACK_VERIFICATION_TOKEN) {
      switch (req.body.actions[0].name) {
        case 'application_response':
          application.respondApplication(req, res, pool);
          break;
        default:
          break;
      }
    } else {
      res.status(403).end();
    }
  });
};
