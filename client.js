var multilevel = require('multilevel')
var manifest   = require('./manifest.json')
var through    = require('through')
var h          = require('hyperscript')

var reconnect = require('reconnect')
var widget    = require('reconnect/widget')

var r = reconnect(function (stream) {

  db = multilevel.client(manifest)
  stream.pipe(db).pipe(stream)

  db.createLiveStream({tail: true})
  .pipe(through(function (data) {
    main.appendChild(
      h('pre', JSON.stringify(data, null, 2))
    )
  }))

}).connect('/ws/taco-demo')

var main = h('div')

document.body.appendChild(
  h('div', widget(r), main)
)

