var fs = require('fs')
var crypto = require('crypto')

var checksum = require('./')

var buffer = fs.readFileSync('index.js')

var algorithms = [
  'sha1',
  'md5',
  'sha256',
  'sha512',
]

describe('Check Sum', function () {
  it('should work', function (done) {
    var hashes = {}

    algorithms.forEach(function (algorithm) {
      hashes[algorithm] = crypto.createHash(algorithm).update(buffer).digest('hex')
    })

    checksum('index.js', hashes, done)
  })

  it('should throw on an incorrect hash', function (done) {
    checksum('index.js', {
      md5: 'asdf'
    }, function (err) {
      err.message.should.include('md5')
      err.algorithm.should.equal('md5')
      err.expected.should.equal('asdf')
      done()
    })
  })
})