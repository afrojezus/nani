'use strict';

const url = require('./utils').url;
const hasParam = require('./utils').hasParam;
const isExpired = require('./utils').isExpired;
const fetch = require('node-fetch');

let request = function (authInfo, query) {
  let token = authInfo.token;
  let expires = authInfo.expires;

  if (!token || isExpired(expires)) {
    return Promise.reject(new Error('Token does not exist or has expired'));
  }

  query = `${url + query}`;
  query = hasParam(query) ? `${query}&access_token=${token}` : `${query}?access_token=${token}`;

  return fetch(query)
    .then(response => {
      if (response.status === 404 || response.status === 500) {
        throw new Error('Bad query');
      }

      return response.json();
    });
};

module.exports = request;
