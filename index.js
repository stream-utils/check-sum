var fs = require('fs')
var crypto = require('crypto')

module.exports = function (stream, obj, done) {
  if (typeof stream === 'string')
    stream = fs.createReadStream(stream)
  stream.once('error', finish)

  var pending = 0
  var called = false

  Object.keys(obj).forEach(function (algorithm) {
    pending++
    var hash = obj[algorithm]
    // should be hex values for string comparison
    if (Buffer.isBuffer(hash)) hash = hash.toString('hex')
    stream.pipe(crypto.createHash(algorithm))
    .once('error', finish)
    .once('readable', function () {
      var actual = this.read().toString('hex')
      if (actual !== hash) {
        var err = new Error('check sum failed for ' + algorithm)
        err.algorithm = algorithm
        err.expected = hash
        err.actual = actual
        finish(err)
      } else if (!--pending) {
        finish()
      }
    })
  })

  // make sure it's only called once
  function finish(err) {
    if (called) return
    called = true
    done(err)
  }

  // yield support
  return function (fn) {
    done = fn
  }
}