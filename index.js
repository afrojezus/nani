'use strict';

const authenticate = require('./lib/authenticate');

let nani = {
  init: function (id, secret) {
    this.id = id;
    this.secret = secret;

    return this;
  },
  id: '',
  secret: '',
  authInfo: {
    token: '',
    expires: ''
  }
};

nani._authenticate = function () {
  let id = this.id;
  let secret = this.secret;

  return authenticate(id, secret)
    .then(data => {
      this.authInfo.token = data.token;
      this.authInfo.expires = data.expires;
    });
};

module.exports = nani;
