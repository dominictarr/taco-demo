var multilevel = require('multilevel')
var manifest   = require('./manifest.json')
var through    = require('through')
var h          = require('hyperscript')
var timestamp = require('monotonic-timestamp')
var reconnect = require('reconnect/sock')
var os = require("os");
var totalMem = os.totalmem()
var libdtrace = require('libdtrace');
var dtp = new libdtrace.Consumer();
var fs = require('fs')
var hname = os.hostname();

reconnect(function (stream) {
  
  db = multilevel.client(manifest)
  stream.pipe(db).pipe(stream)

  db.createLiveStream({tail: true})
    .pipe(through(console.log))
var dfile = __dirname + '/noderuntime.d';

var prog = fs.readFileSync(dfile,'utf8');
       dtp.strcompile(prog);
       dtp.go();

  var counter = 0;
  setInterval(function (e) {
  dtp.consume(function (probe, rec) {
       if (rec){
            console.log(rec.data.toString());
            counter++;
                }
          });
            //
  	var msg = {};
    var chartPoint = {};
    chartPoint.x = new Date();
    chartPoint.y = counter; 
    counter = 0;
    // os.freemem() / totalMem;
    msg.data = chartPoint;
    msg.name = 'Serv01-HTTP-Request Count';
    
    var dt = new Date(); 

    db.put(msg.name + "!" + timestamp(), msg)
  }, 1000)

}).connect('ws://localhost:8000/ws/taco-demo')


