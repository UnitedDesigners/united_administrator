const validate = require('validate.js');
const tiny = require('tiny-json-http');
const notify = require('./notify');
const queries = require('./queries');

const formConstraints = {
  name: {
    presence: true,
  },
  email: {
    presence: true,
    email: true,
    uniqueEmail: true,
  },
  field: {
    presence: true,
  },
  comments: {
    presence: true,
    length: {
      minimum: 250,
    },
  },
};

function newApplication(req, res, pool) {
  validate.async(req.body, formConstraints)
    .then((success, error) => {
      if (success) {
        return pool.query(queries.insert, [
          req.body.name,
          req.body.email,
          req.body.location,
          req.body.field,
          req.body.portfolio,
          req.body.comments,
        ]).catch((e) => { throw e; });
      }
      throw error;
    })
    .then(application => Promise.all([
      res.status(200).end(),
      notify(application.rows[0]),
    ]))
    .catch((e) => {
      if (e instanceof Error) {
        res.status(500).end();
      } else {
        res.status(400).send(e);
      }
    });
}

function respondApplication(req, res, pool) {
  pool.query(queries.update, [req.body.callback_id, req.body.actions[0].value, req.body.user.id])
    .then((application) => {
      if (req.body.actions[0].value === true) {
        return new Promise((resolve, reject) => {
          tiny.post('https://slack.com/api/users.admin.invite').form({ token: process.env.SLACK_ADMIN_TOKEN, email: application.rows[0].email }, (err, result) => {
            if (err) {
              reject(err);
            }
            resolve(result);
          });
        });
      }
      return false;
    })
    .then(() => {
      const orgAttachments = req.body.original_message.attachments;
      orgAttachments[0].actions = [];
      if (req.body.actions[0].value === true) {
        orgAttachments[1] = { fallback: `${req.body.user.name} has accepted this application.`, text: `${req.body.user.name} has accepted this application.` };
      } else {
        orgAttachments[1] = { fallback: `${req.body.user.name} has denied this application.`, text: `${req.body.user.name} has denied this application.` };
      }
      res.send({ response_type: 'in_channel', replace_original: true, attachments: orgAttachments });
    });
}

module.exports = {
  init: (router, pool) => {
    router.post('/applications/submit', (req, res) => newApplication(req, res, pool));

    pool.query(queries.init).catch((e) => { throw e; });

    // Define uniqueEmail validator
    validate.validators.uniqueEmail = value => new Promise((resolve) => {
      pool.query(queries.uniqueEmail, [value])
        .then((res) => {
          if (res.rowCount > 0) {
            resolve('has already been used to apply.');
          }
          resolve();
        })
        .catch((e) => {
          console.log(e.stack);
          resolve(e);
        });
    });
  },
  respondApplication,
};
