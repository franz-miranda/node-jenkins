'use strict'
// .......................................................................
// .......................................................................
var clientGitlab = require('./client.js');

clientGitlab.getToken(function (err) {
    if (err) {
        console.log("Error get Token");
        return;
    }
    console.log("get token");
    clientGitlab.clonePushTest(function (err) {
        if (err) {
            console.log("Error clone proyect test");
            return;
        }
        console.log("Finish clone push test");
        clientGitlab.clonePush(function (err) {
            if (err) {
                console.log("Error clone proyect student");
                return;
            }
            console.log("Finish clone push proyect");
        });
    });
});