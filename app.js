const http = require('http');

const events = require('@slack/events-api');

const slackEvents = events.createSlackEventAdapter(process.env.SLACK_VERIFICATION_TOKEN);
const port = process.env.PORT || 8000;

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/slack/events', slackEvents.expressMiddleware());
require('./modules/welcome/index.js')(slackEvents);
require('./modules/admin/index.js')(app);

slackEvents.on('error', console.error);

http.createServer(app).listen(port, () => {
  console.log(`server listening on port ${port}`);
});
