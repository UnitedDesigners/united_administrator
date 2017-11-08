const http = require('http');

const events = require('@slack/events-api');

require('dotenv').config();

const slackEvents = events.createSlackEventAdapter(process.env.SLACK_VERIFICATION_TOKEN);
const port = process.env.PORT || 8000;

const express = require('express');
const { Pool } = require('pg');
const IoRedis = require('ioredis');
const bodyParser = require('body-parser');

const app = express();
const pool = new Pool();
const redis = new IoRedis();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/slack/events', slackEvents.expressMiddleware());

require('./interactive')(app, pool);

require('./modules/applications').init(app, pool);
require('./modules/welcome')(slackEvents);
require('./modules/music')(slackEvents, pool, redis);
require('./modules/commands')(app);

slackEvents.on('error', console.error);

http.createServer(app).listen(port, () => {
  console.log(`server listening on port ${port}`);
});
