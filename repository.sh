#!/bin/bash
sleep 10
echo "Import Account Gitlab user"
node ./node-jenkins/gitlabClone.js >> log-gitlab-clone.txt
