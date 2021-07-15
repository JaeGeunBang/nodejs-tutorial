FROM centos:centos7

USER root

RUN yum clean all
RUN yum repolist
RUN yum -y update
RUN yum -y install which wget unzip sudo epel-release curlnfs-utils rsync
RUN yum -y install nodejs

WORKDIR /data1/service/myapp

COPY myapp /data1/service/myapp

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
