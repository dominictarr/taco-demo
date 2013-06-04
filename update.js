var $ = require('tree-query')
var fs = require('fs')
var request = require('request')
var path = require('path')

var static = __dirname + '/static/'

var port = process.argv[2]

$(static+'**')
.isFile()
.paraMap(function (e, cb) {
  console.log(path.relative(static, e))

  var u = 'http://localhost:'+port+
  '/http/taco-demo/'+path.relative(static, e)
  fs.createReadStream(e)
    .pipe(request.put(u, function (err, res, body) {
      if(err)
        cb(err)
      else if(res.statusCode >= 400)
        cb({error: res.statusCode, message: body})
      else
        cb()
      console.error(body)
    }))
}).collect(function (err) {
  console.log('updated')
  if(err) throw err
})
