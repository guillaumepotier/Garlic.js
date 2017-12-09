#!/usr/bin/env bash

mocha-phantomjs tests/index.html && mocha-phantomjs tests/index.html#jquery-min
