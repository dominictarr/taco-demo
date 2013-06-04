var createDb = require('./')
var levelup  = require('level')
var createManifest = require('level-manifest')
var fs = require('fs')

var db = levelup('/tmp/taco-demo')

createDb(db)

fs.writeFileSync(
  __dirname + '/manifest.json',
  JSON.stringify(createManifest(db, true), null, 2) + '\n'
)

process.exit(0)
