const cors = require('cors')
const whitelist = require('../env/origins')

let corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed origin'))
        }
    }
}

module.exports = cors(corsOptions)