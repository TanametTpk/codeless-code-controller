const DBConnector = require( "../libs/DBConnector" );
const config = require("./env/database");

module.exports = function() {
  DBConnector.setDatabase(config)
  return DBConnector
}