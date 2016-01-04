'use strict';

let url = () => 'https://anilist.co/api/';
let isExpired = expirationTime => expirationTime <= Math.floor(Date.now() / 1000) - 300;

module.exports = {
  url,
  isExpired
};
