var jenkins = require('jenkins')('http://localhost:8080');

var localizador = "./";
var fs = require('fs');

function generador(nombre, data) {
    fs.writeFileSync(localizador + nombre, data, 'utf8');
}

jenkins.job.config({ name: 'Con2RepoServershell' }, function(err, xml) {
  if (err) throw err;
generador('MavenSonarGitServerShell.xml', xml);
});

