# nani

> Client for the Anilist API

[![Build Status](https://img.shields.io/travis/sotojuan/nani.svg?style=flat-square)](https://travis-ci.org/sotojuan/nani)

This is a Promise-returning Node client for the Anilist API. Aside from letting you make requests to the API it also refreshes your token automatically when it expires.

## Install

```
$ npm install --save nani
```

## Usage

```js
var nani = require('nani').init(id, secret);

nani.get('anime/1')
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });
```

## API

### init(id, secret)

Sets up the `nani` object with the given ID and secret.

#### id

Type: `string`

Your Anilist client ID.

#### secret

Type: `string`

Your Anilist client secret.

### get(query)

Performs the given query and returns a promise that will be fulfilled with the results or rejected with an error.

#### query

Type: `string`

An Anilist API query. See all the possible ones in the [Anilist documentation](https://anilist-api.readthedocs.org/en/latest/).

## Related

- [nani-cli](https://github.com/sotojuan/nani-cli) - CLI for this module

## License

MIT © [Juan Soto](http://juansoto.me)
