'use strict'
// .......................................................................
// .......................................................................
require('shelljs/global');
var jenkins = require('jenkins')('http://localhost:8089');
var fs = require('fs');
const IP = 'localhost';
const PORT = 8089;

var userJson = __dirname+'/user.json';
var account = fs.readFileSync(userJson, 'utf8');
var objAccount = JSON.parse(account);

var adminJson = __dirname+'/admin.json';
var admin = fs.readFileSync(adminJson, 'utf8');
var objAdmin = JSON.parse(admin);

var repositoryJson = __dirname+'/repository.json';
var repository = fs.readFileSync(repositoryJson, 'utf8');
var objRepository = JSON.parse(repository);

var backupJenkinsJava = __dirname+'/java.xml';
var work = fs.readFileSync(backupJenkinsJava, 'utf8');

var scriptJenkins = __dirname+'/plugin-jenkins';
var script = fs.readFileSync(scriptJenkins, 'utf8');


var userJenkins = __dirname+'/someuser.groovy';
var adminGroovy = fs.readFileSync(userJenkins, 'utf8');
const SOMEUSER = "someuser.groovy";

const PROYECT_CREATE = 'script-jenkins.sh';

this.jenkinsWork = function (callback) {
    console.log("Initial work Jenkins");
    var max = Object.keys(objRepository).length + Object.keys(objAccount).length;
    var count = 0;
    var copy = work;
    for (var key in objRepository) {
        var simpleRepository = objRepository[key];
        var nameProyect = simpleRepository.name;
        for (var identifier in objAccount) {
            var usuario = objAccount[identifier];
            copy = copy.replace(/@user@/g, usuario.nombre);
            copy = copy.replace(/@password@/g, usuario.password);
            copy = copy.replace(/@proyect@/g, nameProyect);
            copy = copy.replace(/@central@/g, login);
            copy = copy.replace(/@password-admin@/g, password);
            jenkins.job.create(nameProyect + '-' + usuario.nombre, copy, function (err) {
                if (err)
                    throw err;
                count++;
                if (count == max) {
                    callback(null);
                }
            });
            copy = work;
        }
    }
};

this.jenkinsScript = function (callback) {
    console.log("Scripts Jenkins");
    var copy = script;
    copy = copy.replace(/@user@/g, objAdmin.name);
    copy = copy.replace(/@password@/g, objAdmin.password);
    copy = copy.replace(/@server@/g, IP);
    copy = copy.replace(/@port@/g, PORT);

    var copyGroovy = adminGroovy;
    copyGroovy = copyGroovy.replace(/@user@/g, objAdmin.name);
    copyGroovy = copyGroovy.replace(/@password@/g, objAdmin.password);

    fs.writeFileSync(PROYECT_CREATE, copy, 'utf8');
    fs.writeFileSync(SOMEUSER, copyGroovy, 'utf8');

    chmod(755, PROYECT_CREATE);
    if (exec('sh ' + PROYECT_CREATE + '>> log-script-jenkins.txt').code === 0) {
        console.log("Error script jenkins");
        throw err;
    }else{
        console.log("Finish Exist");
        callback(null);
    }
};
