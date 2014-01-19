@echo off

REM Windows script for running e2e tests
REM You have to run server and capture some browser first
REM
REM Requirements:
REM - NodeJS (http://nodejs.org/)
REM - Protractor (npm install -g protractor)
REM - webdriver-manager start

set BASE_DIR=%~dp0

start cmd /k "webdriver-manager start"
start cmd /k "protractor %BASE_DIR%\..\config\protractor-e2e.conf.js"