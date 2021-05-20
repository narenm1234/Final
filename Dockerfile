#FROM artifactory.tfs.toyota.com/ids-docker-prod-local/node:8-alpine
FROM artifactory.tfs.toyota.com/devops-docker-virtual/node:12-alpine
#RUN npm set config registry https://artifactory.tfs.toyota.com/artifactory/api/npm/devops-npmjs-virtual
WORKDIR /usr/src/app
#COPY ./package.json .
#RUN npm install
COPY ./ ./
RUN npm run build
EXPOSE 8080
CMD [ "npm", "run", "start"]