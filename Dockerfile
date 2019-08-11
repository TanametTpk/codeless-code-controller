FROM node:8

COPY ./package.json /app/
WORKDIR /app/

RUN apt-get update && npm i --production && npm rebuild

COPY . /app/
CMD ["node" , "server.js"]

EXPOSE 80
