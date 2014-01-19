#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Starting Protractor Server"
echo $BASE_DIR
echo "-------------------------------------------------------------------"

protractor "%BASE_DIR%\..\config\protractor-e2e.conf.js"
