const express = require("express")
const http = require("http")
const middleware = require("./middlewares")
const cors = require("cors")

module.exports = function(){

	var app = express();
	const server = http.createServer(app);

	app.use(express.json());
	app.use(cors());
	app.use(middleware.customResponses);
	
	app.use(middleware.logger);

	app.use(require( "../app" ));


	return {
		app:app,
		server:server,
	};
}
