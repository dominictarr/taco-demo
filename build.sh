#! /usr/bin/env bash

port=$1

node ./local.js
browserify client.js --debug -o static/bundle.js
tacodb bundle index.js > bundle.js
curl -X PUT -sSNT bundle.js localhost:$1/data/taco-demo
node update.js $port

