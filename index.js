/**
 * Created by thomasjeanneau on 18/03/2017.
 */

import Nightmare from 'nightmare';
import express from 'express';
import bodyParser from 'body-parser';
import simplecrypt from 'simplecrypt';

const sc = simplecrypt({
  password: 'bhmEB1bgG2qwl31vCXeCPuuct3I7Iq0N9q0g1OQF',
  salt: 'E1F53235E559C254',
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 6000;
const router = express.Router();

const nightmare = Nightmare({
  show: false,
  dock: false,
  loadTimeout: 10000, // in ms
  gotoTimeout: 10000, // in ms
  waitTimeout: 15000, // in ms
  executionTimeout: 10000, // in ms
});

router.get('/linkedin/validate', (req, res) => {
  const { email, cryptPassword } = req.query;
  //const password = sc.decrypt('salut')
  nightmare
    .goto('https://www.linkedin.com/uas/login')
    .type('#session_key-login', email)
    .type('#session_password-login', cryptPassword)
    .click('#btn-primary')
    .wait('#extended-nav-search')
    .evaluate(() => {
      return window.location.href;
    })
    .end()
    .then((title) => {
      res.json({
        isValidated: (title === 'https://www.linkedin.com/nhome/?trk=' || title === 'https://www.linkedin.com/feed/?trk=')
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        isValidated: false
      });
    });
});

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
