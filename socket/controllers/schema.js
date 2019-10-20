const DatabaseMeta = require('../../app/classes/databaseMeta');

module.exports = (socket) => {

	socket.on('create-databaseMeta' , async(data) => {

		try{

			let data = await DatabaseMeta.create(data);

			

		} catch (err) {

			console.log(err);

		}

	})

	socket.on('update-databaseMeta' , async(data) => {

		try{

			let target = await DatabaseMeta.find({ _id : data._objectId });
			let data = await DatabaseMeta.update(target , data);

			

		} catch (err) {

			console.log(err);

		}

	})

	socket.on('delete-databaseMeta' , async(data) => {

		try{

			let target = await DatabaseMeta.find({ _id : data._objectId });
			let data = await DatabaseMeta.delete(target , data);

			

		} catch (err) {

			console.log(err);

		}

	})

	

};
