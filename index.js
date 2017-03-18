/**
 * Created by thomasjeanneau on 18/03/2017.
 */

var Nightmare = require('nightmare');

const config = {
  show: false,
  dock: false,
  loadTimeout: 10000, // in ms
  gotoTimeout: 10000, // in ms
  waitTimeout: 15000, // in ms
  executionTimeout: 10000, // in ms
};

var nightmare = Nightmare(config);

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