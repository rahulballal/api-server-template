FROM node:8.5.0-alpine

ENV TZ Australia/Sydney

EXPOSE 3000

WORKDIR /var/app

COPY . ./

ENTRYPOINT ["node", "src/server.js"]
