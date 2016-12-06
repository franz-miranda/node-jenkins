#!/bin/bash
echo "Init Script Jenkins"
sleep 60
echo "Import Sonar Jenkins"
curl -X POST http://localhost:8089/pluginManager/installNecessaryPlugins -d '<install plugin="sonar@current" />'
sleep 5
echo "Import Git Jenkins"
curl -X POST http://localhost:8089/pluginManager/installNecessaryPlugins -d '<install plugin="git@current" />'
sleep 5
echo "Import GreenBalls Jenkins"
curl -X POST http://localhost:8089/pluginManager/installNecessaryPlugins -d '<install plugin="greenballs@current" />'
sleep 5
echo "Import Github Jenkins"
curl -X POST http://localhost:8089/pluginManager/installNecessaryPlugins -d '<install plugin="github@current" />'
sleep 100
somesscript=$(cat ./node-jenkins/somescript-maven.groovy)
somesthread=$(cat ./node-jenkins/somethread.groovy)
someuser=$(cat ./node-jenkins/someuser.groovy)
echo "Import Maven Jenkins"
curl -d "script=$somesscript" http://localhost:8089/script
sleep 10
echo "Import Threads"
curl -d "script=$somesthread" http://localhost:8089/script
sleep 10
echo "Import Account Gitlab user"
node ./node-jenkins/gitlab.js >> log.txt
sleep 10
echo "Reset Password Jenkins"
curl -d "script=$someuser" http://localhost:8089/script
sleep 10
#curl -X POST -u admin:admin http://localhost:8089/restart
echo "Restart Jenkins"
curl -X POST -u adminapp:adminapp http://localhost:8089/safeRestart
