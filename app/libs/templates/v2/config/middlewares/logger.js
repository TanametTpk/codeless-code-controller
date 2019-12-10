var device = require('express-device');
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');

if (!fs.existsSync(path.join(__dirname, '../../logs'))){
    fs.mkdirSync(path.join(__dirname, '../../logs'))
}

let accessLogStream = fs.createWriteStream(path.join(__dirname, '../../logs/access.log'), { flags: 'a' });
var loggerFormat = '[:date[web]] :method :url :status :response-time';

module.exports = morgan(loggerFormat, { stream: accessLogStream });