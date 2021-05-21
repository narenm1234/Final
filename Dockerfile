FROM artifactory.tfs.toyota.com/ids-docker-prod-local/node:8-alpine
#FROM node:12.16.2-alpine3.11
RUN npm config set ca=""
RUN npm set strict-ssl false
RUN npm config set registry https://artifactory.tfs.toyota.com/artifactory/api/npm/devops-npmjs-virtual
WORKDIR /app
COPY ./package.json .
RUN npm install --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start"]