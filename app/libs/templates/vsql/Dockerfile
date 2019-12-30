FROM node:8

COPY ./package.json /app/
WORKDIR /app/

RUN npm i --production

COPY . /app/
CMD ["node" , "server.js"]

EXPOSE 80