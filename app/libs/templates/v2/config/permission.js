const getAll = require('require-all')

let permission = getAll({
    dirname: __dirname + "/editable",
})

module.exports = permission