let environments = process.env
let allowed_origins = Object.keys(environments).filter(env => env.match(/^ALLOW_ORIGIN\d*$/)).map((key) => environments[key])

if (allowed_origins.length < 1) {
    allowed_origins = ["http://localhost"]
}

module.exports = allowed_origins
