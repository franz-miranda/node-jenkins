'use strict'
// .......................................................................
// .......................................................................
var clientJennkins = require('./clientJenkins.js');


clientJennkins.jenkinsWork(function (err) {
    if (err) {
        console.log("Error create jenkins proyect");
        return;
    }
    console.log("Finish work");
    clientJennkins.jenkinsScript(function (err) {
        if (err) {
            console.log("Error script");
            return;
        }
        console.log("Finish script");
    });
});