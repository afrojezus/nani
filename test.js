'use strict';

import test from 'ava';
import nani from './';
import authenticate from './lib/authenticate';
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

test('authenticate resolves on good id and secret', async t => {
  let data = await authenticate(id, secret);

  t.ok(data.hasOwnProperty('token'));
  t.ok(data.hasOwnProperty('expires'));
});

test('._authenticate resolves with good id and secret', async t => {
  let client = nani.init(id, secret);
  await client._authenticate();

  t.notSame(client.authInfo.token, '');
});
