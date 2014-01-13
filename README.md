# check-sum [![Build Status](https://travis-ci.org/stream-utils/check-sum.png)](https://travis-ci.org/stream-utils/check-sum)

Assert multiple checksums on a stream in parallel.

## Example

```js
var checksum = require('check-sum')
var stream = require('fs').createReadStream('package.json')

checksum(stream, {
  md5: 'asdfasdfasdf',
  sha1: 'asdfasdfasdf'
}, function (err) {
  if (err) throw err // will throw on any failed check sums
})
```

## API

### checksum(stream, hashes, callback)

`stream` is a `Readable Stream` or a `filename`. `hashes` is an object of the form `algorithm: hash` where `hash` is in `hex` or `Buffer` format.

### Errors

Errors will have the following properties:

- `algorithm` - the algorithm that failed
- `expected`
- `actual`

## License

The MIT License (MIT)

Copyright (c) 2014 Jonathan Ong me@jongleberry.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
