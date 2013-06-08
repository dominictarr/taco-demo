var sublevel   = require('level-sublevel')
var multilevel = require('multilevel')
var static     = require('level-static')
var LiveStream = require('level-live-stream')

module.exports = function (db) {

  sublevel(db)
  LiveStream.install(db)

  db.options.valueEncoding = 'json'
  db.options.keyEncoding   = 'utf-8'

  var files = static(db.sublevel('static'))

  db.on('http_connection', function (req, res) {
    console.error('HTTP', req.method, req.url)
    files(req, res)
  })


  db.on('connection', function (stream) {
    stream.pipe(multilevel.server(db)).pipe(stream)
  })

//  store.methods.createFileReadStream = {type: 'readable'}
//  store.methods.createFileWriteStream = {type: 'writable'}

}
