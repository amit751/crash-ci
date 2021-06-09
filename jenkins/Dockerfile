FROM jenkins/jenkins

ENV JENKINS_USER admin
ENV JENKINS_PASS admin
ENV JENKINS_HOME /var/jenkins_home
# Skip initial setup
ENV JAVA_OPTS -Djenkins.install.runSetupWizard=false


COPY plugins.txt /usr/share/jenkins/plugins.txt
RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/plugins.txt
USER root
RUN apt-get update \
    && apt-get install -qqy apt-transport-https ca-certificates curl gnupg2 software-properties-common npm

RUN curl -sL https://deb.nodesource.com/setup_14.x  | bash -
RUN apt-get -y install nodejs


RUN npm install npm@latest -g


USER jenkins
