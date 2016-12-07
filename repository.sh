#!/bin/bash
sleep 10
echo "Import Account Gitlab user"
node ./node-jenkins/gitlabClone.js >> console-repository.log
