#!/bin/bash
sleep 10
echo "Import Account Gitlab user"
node ./node-jenkins/gitlabUser.js >> log-gitlab-user.txt