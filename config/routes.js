const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('../database/dbConfig');
const { authenticate } = require('./middlewares');

const secret = require('../_secrets/keys');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

// configure jwt


function generateToken(user) {
  const payload = {
    username: user.username,
    password: user.password

  };

  const options = {
    expiresIn: '1h',
    jwtid: 'whitehairsucks',
  };

  return jwt.sign(payload, secret.jwtKey, options);
}


function register(req, res) {
  // implement user registration

  const user = req.body;

  // hash password
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  db('users')
    .insert(user)
    .then(function(ids) {
      db('users')
        .where({ id: ids[0] })
        .first()
        .then(user => {
          // generate the token
          const token = generateToken(user);
          // req.session.username = user.username;

          // attach the token to the response
          res.status(201).json(token);
        });
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
};


function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
