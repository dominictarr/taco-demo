#! /usr/bin/env bash

port=$1

if [ x$port = x ]; then
  port=8000
fi

node ./local.js
browserify client.js --debug -o static/bundle.js
tacodb bundle index.js > bundle.js
curl -X PUT -sSNT bundle.js localhost:$port/data/taco-demo
node update.js $port

