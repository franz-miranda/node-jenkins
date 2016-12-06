'use strict'
// .......................................................................
// .......................................................................
var clientGitlab = require('./client.js');

clientGitlab.gitlabPassword(function (err) {
    if (err) {
        console.log("Error set new Password");
        return;
    }
    clientGitlab.getToken(function (err) {
        if (err) {
            console.log("Error get Token");
            return;
        }
        console.log("get token");
        console.log("Finish create proyect");
        clientGitlab.createUserProyectBash(function (err) {
            if (err) {
                console.log("Verificacion de Proyect");
                return;
            }
            clientGitlab.clonePush(function (err) {
                if (err) {
                    console.log("Error clone proyect");
                    return;
                }
                console.log("Finish clone push proyect");
                clientGitlab.jenkinsWork(function (err) {
                    if (err) {
                        console.log("Error create jenkins proyect");
                        return;
                    }
                    console.log("Finish work complete");
                });
            });
        });
    });
});