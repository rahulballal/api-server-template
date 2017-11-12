FROM node:8.9.0-alpine

ENV TZ Australia/Sydney

EXPOSE 3000

USER node

WORKDIR /var/app

COPY . ./

ENTRYPOINT ["node", "src/server.js"]
