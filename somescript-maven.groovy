// Inspired by https://wiki.jenkins-ci.org/display/JENKINS/Add+a+Maven+Installation%2C+Tool+Installation%2C+Modify+System+Config
import jenkins.model.*

println "Adding an config for Maven 3.0.4"

a=Jenkins.instance.getExtensionList(hudson.tasks.Maven.DescriptorImpl.class)[0];
b=(a.installations as List);
b.add(new hudson.tasks.Maven.MavenInstallation("MAVEN3", "/usr/local/apache-maven-3.0.4", []));
a.installations=b
a.save()

println "OK - Maven auto-installer (from Apache) added for 3.0.4"

