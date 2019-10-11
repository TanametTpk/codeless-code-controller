const Attribute = require('../../app/classes/attribute');

module.exports = (socket) => {

	socket.on('create-attribute' , async(data) => {

		try{

			let data = await Attribute.create(data);

			

		} catch (err) {

			console.log(err);

		}

	})

	socket.on('update-attribute' , async(data) => {

		try{

			let target = await Attribute.find({ _id : data._objectId });
			let data = await Attribute.update(target , data);

			

		} catch (err) {

			console.log(err);

		}

	})

	socket.on('delete-attribute' , async(data) => {

		try{

			let target = await Attribute.find({ _id : data._objectId });
			let data = await Attribute.delete(target , data);

			

		} catch (err) {

			console.log(err);

		}

	})

	

};
