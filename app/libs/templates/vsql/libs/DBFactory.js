const Sequelize = require('sequelize')
const fs = require('fs')

const Databases = {
    MYSQL: "mysql",
    MARIA_DB: "mariadb",
    POSTGRES: "postgres",
    MSSQL: "mssql",
    SQLITE: "sqlite"
}

const connectSQLDatabase = ({dbName, username, password, host, dialect, pool, storage, dialectOptions}) => {

    return new Sequelize(dbName, username, password, {host, dialect, pool, storage, dialectOptions})

}

const connectDatabaseByUrl = (url) => {

    return new Sequelize(url)

}

const isSupportedDb = (db) => {
    let sqlDb = Object.values(Databases)
    return sqlDb.includes(db)
}

const connectDatabase = (config) => {

    let { database, setting, url } = config
    setting = {
        ...setting,
        dialect: database
    }

    if (url) return connectDatabaseByUrl(url)

    if (!isSupportedDb(database)) throw new Error("Database not support")

    return connectSQLDatabase(setting)

}

const readDatabaseConfig = (path) => {
    if (path.match(/.+\.js$/)) return connectDatabase(require(path))
    return connectDatabase(JSON.parse(fs.readFileSync(path, 'utf-8')))
}

module.exports = {
    Databases,
    connectDatabase,
    readDatabaseConfig
}