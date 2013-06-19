var multilevel = require('multilevel')
var manifest   = require('./manifest.json')
var through    = require('through')
var h          = require('hyperscript')
var timestamp = require('monotonic-timestamp')
var reconnect = require('reconnect/sock')
var os = require("os");
var totalMem = os.totalmem()


var hname = os.hostname();

reconnect(function (stream) {

    console.log('connection')
  db = multilevel.client(manifest)
  stream.pipe(db).pipe(stream)

  db.createLiveStream({tail: true})
    .pipe(through(console.log))


  setInterval(function (e) {
    
    var msg = {};
    var chartPoint = {};
    chartPoint.x = new Date();
    chartPoint.y = os.freemem() / totalMem;
    msg.data = chartPoint;
    msg.name = hname + '-Total-Memory-Usage';
    
    var dt = new Date(); 

    db.put(msg.name + "!" + timestamp(), msg, function (err) {
      if(err)
        console.error(err.stack)
    })
  }, 1000)

}).connect('ws://localhost:8000/ws/taco-demo')


