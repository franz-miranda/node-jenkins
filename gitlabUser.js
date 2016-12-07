'use strict'
// .......................................................................
// .......................................................................
var clientGitlab = require('./client.js');

clientGitlab.gitlabPassword(function (err) {
    if (err) {
        console.log("Error set new password");
        return;
    }
    clientGitlab.getToken(function (err) {
        if (err) {
            console.log("Error get Token");
            return;
        }
        console.log("get token");
        clientGitlab.createUserProyectBash(function (err) {
            if (err) {
                console.log("Error create user and proyect");
                return;
            }
            console.log("Finish create user and proyect");
        });
    });
});