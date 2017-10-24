const validate = require('validate.js');
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
    .then(pool.query(queries.insert, [
      req.body.name,
      req.body.email,
      req.body.location,
      req.body.field,
      req.body.portfolio,
      req.body.comments,
    ]))
    .then(application => notify(application))
    .catch((e) => {
      if (e instanceof Error) {
        res.status(500).end();
      } else {
        res.status(400).send(e);
      }
    });
}

module.exports = (router, pool) => {
  router.post('/applications/submit', (req, res) => newApplication(req, res, pool));

  pool.query(queries.init);

  // Define uniqueEmail validator
  validate.validators.uniqueEmail = value => new validate.Promise((resolve, reject) => {
    pool.query(queries.uniqueEmail, [value])
      .then(res => (res.rows.length > 0 ? resolve('has already been used to apply.') : resolve()))
      .catch((e) => {
        console.log(e.stack);
        reject();
      });
  });
};
