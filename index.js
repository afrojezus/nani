'use strict';

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

module.exports = nani;
