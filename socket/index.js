const controller = require('./controllers');

module.exports = function(server){

	const io = require('socket.io')(server);

	// user connected
	io.on('connection' , function(socket){

		// setup controller
		controller.room(socket)
		controller.attribute(socket)
		controller.databaseMeta(socket)

		socket.on('disconnect' , function(){
			// user disconnected
		})

	})

	return io

}
