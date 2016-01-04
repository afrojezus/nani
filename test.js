'use strict';

import test from 'ava';
import nani from './';
import {url, isExpired} from './lib/utils';

const id = 'dummytest-hxdu6';
const secret = 'vXhDdsfsdrHV2iWxFBsyIsbGoJA9W';

test('client correctly initializes', t => {
  let client = nani.init(id, secret);

  t.ok(client.hasOwnProperty('init'));
  t.ok(client.hasOwnProperty('id'));
  t.ok(client.hasOwnProperty('secret'));
  t.ok(client.hasOwnProperty('authInfo'));
  t.is(client.id, id);
  t.is(client.secret, secret);
});

test('API URL is correct', t => {
  t.is(url(), 'https://anilist.co/api/');
});

test('isExpired works', t => {
  t.ok(isExpired(1));
  t.ok(isExpired(3600));
  t.ok(isExpired(Math.floor(Date.now() / 1000) - 600));
  t.ok(isExpired(Math.floor(Date.now() / 1000) - 500));
  t.notOk(isExpired(Math.floor(Date.now() / 1000) + 100));
  t.notOk(isExpired(1000000000000));
});
