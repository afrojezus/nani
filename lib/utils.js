'use strict';

const url = 'https://anilist.co/api/';
const isExpired = expirationTime => expirationTime <= Math.floor(Date.now() / 1000) - 300;
const hasParam = string => string.indexOf('?') !== -1;

module.exports = {
  url,
  isExpired,
  hasParam
};
