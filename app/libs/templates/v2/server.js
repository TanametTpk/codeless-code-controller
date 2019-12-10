let express = require('./config/express');
let items = express();
const server = items.server;
const setup = require('./config/env/setup')

server.listen( setup.PORT , function() {
    console.log(`server run at port ${setup.PORT}`);
})
