var express = require('./config/express');
var items = express();
const server = items.server;
// const io = require('./socket')(server);

server.listen(80 , function() {
    console.log(`server run at http://localhost:80`);
})
