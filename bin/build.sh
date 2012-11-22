#!/usr/bin/env bash

if [[ -z "$1" ]]
then
echo "You must give a version number. eg: ./bin/build.sh 1.0.0"

else
echo "** building garlic.min.js version " $1
ruby ./bin/minify garlic.js dist/garlic.min.js $1 --force
echo "  done!"

echo "** building garlic-standalone.min.js version " $1
ruby ./bin/minify resources/zepto-1.0rc1[zepto.event.data].min.js garlic.js dist/garlic-standalone.min.js $1 --force
echo "  done!"
fi