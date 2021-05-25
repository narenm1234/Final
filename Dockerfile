FROM artifactory.tfs.toyota.com/ids-docker-prod-local/node:8-alpine
#FROM node:12.16.2-alpine3.11
RUN apt-get install -y nodejs

RUN nodejs -v

RUN apt install -y npm

RUN npm -v