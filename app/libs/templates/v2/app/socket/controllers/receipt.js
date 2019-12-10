const Receipt = require('../../../libs/receipt');

module.exports = (socket) => {

	socket.on('create-receipt' , async(data) => {

		try{

			let data = await Receipt.create(data);

			

		} catch (err) {

			console.log(err);

		}

	})

	socket.on('update-receipt' , async(data) => {

		try{

			let target = await Receipt.find({ _id : data._objectId });
			let data = await Receipt.update(target , data);

			

		} catch (err) {

			console.log(err);

		}

	})

	socket.on('delete-receipt' , async(data) => {

		try{

			let target = await Receipt.find({ _id : data._objectId });
			let data = await Receipt.delete(target , data);

			

		} catch (err) {

			console.log(err);

		}

	})

	

};
