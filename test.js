'use strict';

import test from 'ava';
import nani from './';
import authenticate from './lib/authenticate';
import request from './lib/request';
import {url, isExpired, hasParam} from './lib/utils';

const id = 'dummytest-hxdu6';
const secret = 'vXhDdsfsdrHV2iWxFBsyIsbGoJA9W';

test('client correctly initializes', t => {
  let client = nani.init(id, secret);

  t.true(client.hasOwnProperty('init'));
  t.true(client.hasOwnProperty('id'));
  t.true(client.hasOwnProperty('secret'));
  t.true(client.hasOwnProperty('authInfo'));
  t.is(client.id, id);
  t.is(client.secret, secret);
});

test('API URL is correct', t => {
  t.is(url, 'https://anilist.co/api/');
});

test('isExpired works', t => {
  t.true(isExpired(1));
  t.true(isExpired(3600));
  t.true(isExpired(Math.floor(Date.now() / 1000) - 600));
  t.true(isExpired(Math.floor(Date.now() / 1000) - 500));
  t.false(isExpired(Math.floor(Date.now() / 1000) + 301));
  t.false(isExpired(1000000000000));
});

test('hasParam works', t => {
  t.true(hasParam('browse/anime?season=winter'));
  t.false(hasParam('user/1'));
});

test('authenticate resolves on good id and secret', async t => {
  let data = await authenticate(id, secret);

  t.true(data.hasOwnProperty('token'));
  t.true(data.hasOwnProperty('expires'));
});

test('._authenticate resolves with good id and secret', async t => {
  let client = nani.init(id, secret);
  await client._authenticate();

  t.notSame(client.authInfo.token, '');
});

test('get resolves with good token and query', async t => {
  let client = nani.init(id, secret);
  let anime = await client.get('anime/1');

  t.same(typeof anime, 'object');
  t.true(anime.hasOwnProperty('id'));
});

test('get resolves with expired token and query', async t => {
  let client = nani.init(id, secret);
  await client._authenticate();

  client.authInfo.expires -= 3300;

  let anime = await client.get('anime/1');

  t.same(typeof anime, 'object');
  t.true(anime.hasOwnProperty('id'));
});

test('request rejects with expired token', t => {
  let authInfo = {
    token: '1',
    expires: 1
  };

  t.throws(request(authInfo, 'anime/1'), 'Token does not exist or has expired');
});

test('authenticate rejects with empty id and secret', t => {
  t.throws(authenticate('', ''), 'No client ID or secret given');
});

test('._authenticate rejects with empty id and secret', t => {
  let client = nani.init('', '');

  t.throws(client._authenticate(), 'No client ID or secret given');
});

test('get rejects with bad query', async t => {
  let client = nani.init(id, secret);
  await client._authenticate();

  return client.get('I am a bad query')
    .catch(error => {
      t.ok(error);
      t.is(error.message, 'Bad query');
    });
});

test('get resolves on query with params', async t => {
  let client = nani.init(id, secret);

  let result = await client.get('browse/anime?season=winter');

  t.ok(result[0].id);
})
