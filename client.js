'use strict'
// .......................................................................
// .......................................................................
require('shelljs/global');
var request = require('request'); // www.npmjs.com/package/request
var fs = require('fs');

const PROTOCOLO = 'http';
const IP = 'localhost';

const PORT = 80;
const API = 'api/v3';
const SESSION = 'session';
const USERS = 'users';
const PROYECT = 'projects/user';
const PRIVATE = '?private_token=';
const FOLDER = 'base-java';
const PROYECT_EJECT = 'proyect.sh';
const FOLDER_TEST = 'test';

const PROYECT_CREATE = 'new-proyect.sh';

var adminJson = __dirname+'/admin.json';
var admin = fs.readFileSync(adminJson, 'utf8');
var objAdmin = JSON.parse(admin);

var userJson = __dirname+'/user.json';
var account = fs.readFileSync(userJson, 'utf8');
var objAccount = JSON.parse(account);

var repositoryJson = __dirname+'/repository.json';
var repository = fs.readFileSync(repositoryJson, 'utf8');
var objRepository = JSON.parse(repository);

var fileName = __dirname+'/file';
var fileData = fs.readFileSync(fileName, 'utf8');

console.log(objRepository);
var backupJenkinsJava = __dirname+'/java.xml';
var work = fs.readFileSync(backupJenkinsJava, 'utf8');

var token = undefined;
var login = 'root';
var password = objAdmin.password;

this.getToken = function (callback) {
    request.post(
        {
            url: PROTOCOLO + '://' + IP + ':' + PORT + '/' + API + '/' + SESSION,
            headers: {
            },
            body: 'login=' + login + '&password=' + password
        },
        function (err, response, body) {
            token = JSON.parse(body);
            console.log(token);
            callback(err);
        })
};

this.clonePush = function (callback) {
    console.log("Initial Clone");
    var max = Object.keys(objRepository).length;
    var count = 0;
    for (var key in objRepository) {
        var simpleRepository = objRepository[key];
        var nameProyect = simpleRepository.name;
        var namePractice = simpleRepository.practice;
        if (exec('git clone ' + namePractice + ' ' + FOLDER).code !== 0) {
            echo('Error: al Clonar Repo');
            exit(1);
        } else {
            var readProyect = fs.readFileSync(FOLDER + '/' + PROYECT_EJECT, 'utf8');
            readProyect += 'FOLDER=/"' + FOLDER + '" \n' +
                'RUTA=$PWD$FOLDER \n';
            for (var identifier in objAccount) {
                var accountStudent = objAccount[identifier];
                var nameStudent = accountStudent.nombre;
                var passwordStudent = accountStudent.password;
                var userRepo = token.web_url.substring(0, 7);
                userRepo += nameStudent + ':' + passwordStudent + '@';
                console.log(userRepo);
                var urlRepo = userRepo + IP + '/' + nameStudent + '/' + nameProyect + '.git';
                readProyect += 'SUBSTRING="' + nameStudent + '" \n' +
                    'PROYECT="' + nameProyect + '"\n' +
                    'echo $SUBSTRING \n' +
                    'echo $RUTA \n' +
                    'rm -rf $RUTA/.git \n' +
                    'sed s/"{{ item.name }}"/$PROYECT-$SUBSTRING/g $RUTA/pom.j2 > $RUTA/pom.xml \n' +
                    'sed s/"{{ item.name }}"/$PROYECT-$SUBSTRING/g $RUTA/JunitTesting/pom.j2 > $RUTA/JunitTesting/pom.xml \n' +
                    'cd $RUTA && git init \n' +
                    'cd $RUTA && git config --global user.name $SUBSTRING \n' +
                    'cd $RUTA && git config --global user.email $SUBSTRING\@example.com \n' +
                    'cd $RUTA && git remote add origin ' + urlRepo + ' \n' +
                    'cd $RUTA && git add . \n' +
                    'cd $RUTA && git commit -m "Config pom.xml" \n' +
                    'cd $RUTA && git push -u origin master \n';
            }
            fs.writeFileSync(FOLDER + '/' + PROYECT_EJECT, readProyect, 'utf8');
            if (exec('sh ' + FOLDER + '/' + PROYECT_EJECT).code === 0) {
                console.log("correto subido");
                if (exec('rm -rf ' + FOLDER).code === 0) {
                    console.log("correto eliminar");
                    count++;
                    if (count == max) {
                        callback(null);
                    }
                } else {
                    console.log("fallo eliminar");
                }
            } else {
                console.log("error al subir archivos");
            }
        }
        console.log('Termino ejecucion');
    }
};

this.clonePushTest = function (callback) {
    console.log("Initial Clone");
    var max = Object.keys(objRepository).length;
    var count = 0;
    for (var key in objRepository) {
        var simpleRepository = objRepository[key];
        var nameProyect = simpleRepository.name;
        var nameTest = simpleRepository.central;
        if (exec('git clone ' + nameTest + ' ' + FOLDER_TEST).code !== 0) {
            echo('Error: al Clonar Repo');
            exit(1);
        } else {
            var readProyect = fs.readFileSync(FOLDER_TEST + '/' + PROYECT_EJECT, 'utf8');
            readProyect += 'FOLDER_TEST=/"' + FOLDER_TEST + '" \n' +
                'RUTA=$PWD$FOLDER_TEST \n';
            var userRepo = token.web_url.substring(0, 7);
            userRepo += login + ':' + password + '@';
            console.log(userRepo);
            var urlRepo = userRepo + IP + '/' + login + '/' + nameProyect + '.git';
            readProyect += 'SUBSTRING="' + login + '" \n' +
                'PROYECT="' + nameProyect + '"\n' +
                'echo $SUBSTRING \n' +
                'echo $RUTA \n' +
                'rm -rf $RUTA/.git \n' +
                'cd $RUTA && git init \n' +
                'cd $RUTA && git config --global user.name $SUBSTRING \n' +
                'cd $RUTA && git config --global user.email $SUBSTRING\@example.com \n' +
                'cd $RUTA && git remote add origin ' + urlRepo + ' \n' +
                'cd $RUTA && git add . \n' +
                'cd $RUTA && git commit -m "Config proyect test Java" \n' +
                'cd $RUTA && git push -u origin master \n';

            fs.writeFileSync(FOLDER_TEST + '/' + PROYECT_EJECT, readProyect, 'utf8');
            if (exec('sh ' + FOLDER_TEST + '/' + PROYECT_EJECT).code === 0) {
                console.log("correto subido");
                if (exec('rm -rf ' + FOLDER_TEST).code === 0) {
                    console.log("correto eliminar");
                    count++;
                    if (count == max) {
                        callback(null);
                    }
                } else {
                    console.log("fallo eliminar");
                }
            } else {
                console.log("error al subir archivos");
            }
        }
        console.log('Finish ');
    }
};

this.gitlabPassword = function (callback) {
    fileData = fileData.replace(/@password@/g, objAdmin.password);
    fs.writeFileSync(fileName, fileData, 'utf8');
    console.log("Initial reset password Gitlab");
    if (exec('gitlab-rails console production < '+__dirname+'/file').code !== 0) {
        console.log("Error add password GitLab");
        exit(1);
    } else {
        console.log("Finish password Gitlab");
        callback(null);
    }
};

this.createUserProyectBash = function (callback) {
    console.log("Count element "+Object.keys(objAccount).length);
    var verification = '#!/bin/bash \n';

    for (var key in objAccount) {
        var accountStudent = objAccount[key];
        var userStudent = accountStudent.nombre;
        var passwordStudent = accountStudent.password;
        verification += 'curl --header "PRIVATE-TOKEN: '+token.private_token+'" -X POST '+'"'+PROTOCOLO + '://' + IP + ':' + PORT + '/' + API + '/' + USERS + '?email=' + userStudent + '@upv.com&password=' + passwordStudent + '&username=' + userStudent + '&name=' + userStudent + '" \n';
    }

    for (var i = 0; i < Object.keys(objAccount).length; i++) {
        for (var key in objRepository) {
            var simpleRepository = objRepository[key];
            var nameProyect = simpleRepository.name;
            var nameUser = i+2;
            console.log("Create Proyect Name User: "+nameUser+" Proyect: "+nameProyect);
            if(i == 0){
                verification += 'curl --header "PRIVATE-TOKEN: '+token.private_token+'" -X POST '+'"'+PROTOCOLO + '://' + IP + ':' + PORT + '/' + API + '/' + PROYECT + '/' + 1 + '?name=' + nameProyect + '" \n';
            }
            verification += 'curl --header "PRIVATE-TOKEN: '+token.private_token+'" -X POST '+'"'+PROTOCOLO + '://' + IP + ':' + PORT + '/' + API + '/' + PROYECT + '/' + nameUser+ '?name=' + nameProyect + '" \n';
        }
    }
    fs.writeFileSync(PROYECT_CREATE, verification, 'utf8');
    chmod(755, PROYECT_CREATE);
    if (exec('sh ' + PROYECT_CREATE + '>> data.txt').code === 0) {
        console.log("Exit user and proyect GitLab");
        callback(null);
    }else{
        callback(null);
    }
};