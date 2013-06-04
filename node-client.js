var multilevel = require('multilevel')
var manifest   = require('./manifest.json')
var through    = require('through')
var h          = require('hyperscript')

var reconnect = require('reconnect/sock')
reconnect(function (stream) {
  
  db = multilevel.client(manifest)
  stream.pipe(db).pipe(stream)

  db.createLiveStream()
    .pipe(through(console.log))

}).connect('ws://localhost:8000/ws/taco-demo')


