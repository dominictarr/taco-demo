var http = require('http');
var d = require('dtrace-provider');

var dtp = d.createDTraceProvider("httpserver");
var p1 = dtp.addProbe("probe1", "char *");

dtp.enable();

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  dtp.fire("probe1", function(p) {
    return ["request fired", "some data"];
});
  res.end('Hello World\n');
}).listen(8080, '0.0.0.0');
//Replace the IP Above and below with your machines IP address
//console.log('Server running at http://37.153.97.39/');
