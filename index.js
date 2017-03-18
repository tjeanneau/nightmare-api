/**
 * Created by thomasjeanneau on 18/03/2017.
 */

var Nightmare = require('nightmare');
var express = require('express');
var app = express();

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('App listening at http://%s:%s', host, port)
});

const config = {
  show: false,
  dock: false,
  loadTimeout: 10000, // in ms
  gotoTimeout: 10000, // in ms
  waitTimeout: 15000, // in ms
  executionTimeout: 10000, // in ms
};

var nightmare = Nightmare(config);

app.get('/', function (req, res) {
  console.log('Hello World!');
  nightmare
    .goto('https://www.linkedin.com/uas/login')
    .type('#session_key-login', 'hi@thomasjeanneau.com')
    .type('#session_password-login', 'Xf0WfnOBOPfUwrY1bXeNsGAGfAvDGjN0kuTNxrOf')
    .click('#btn-primary')
    .wait('#extended-nav-search')
    .evaluate(function () {
      return window.location.href;
    })
    .end()
    .then(function (title) {
      console.log(title === 'https://www.linkedin.com/nhome/?trk=' || title === 'https://www.linkedin.com/feed/?trk=')
    })
    .catch(function (err) {
      console.log(err)
    });
  res.send('Hello World!')
});