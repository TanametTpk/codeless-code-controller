const getAll = require('require-all')

let models = getAll({
    dirname: __dirname + "/models",
})

let configs = getAll({
    dirname: __dirname + "/config",
})

let services = getAll({
    dirname: __dirname + "/services",
})

module.exports = {
    models,
    configs,
    services
}