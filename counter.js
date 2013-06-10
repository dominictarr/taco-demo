var fs = require('fs');
var Stream = require('stream').Stream;
var libdtrace = require('libdtrace');
var dtp = new libdtrace.Consumer();

//var dfile = __dirname + '/requests.d'
var dfile = __dirname + '/noderuntime.d';
var interval = 1000;

var prog = fs.readFileSync(dfile,'utf8');
       dtp.strcompile(prog);
       dtp.go();
var counter =0;
   setInterval(function () {
    
  	dtp.consume(function (probe, rec) {
  	   if (rec){
            // console.log(rec.data.toString());
    	       counter++;  
       }
	});
        console.log(counter);
        counter = 0;     
        dtp.aggwalk(function (id, key, val) {
           var data = {};
	   data.id = id;
           data.key = key;
           data.val = val;
	   console.log(JSON.stringify(data));
        });

   }, interval);

