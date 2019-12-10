const Receipt_item = require('../../../libs/receipt_item');

module.exports = (socket) => {

	socket.on('create-receipt_item' , async(data) => {

		try{

			let data = await Receipt_item.create(data);

			

		} catch (err) {

			console.log(err);

		}

	})

	socket.on('update-receipt_item' , async(data) => {

		try{

			let target = await Receipt_item.find({ _id : data._objectId });
			let data = await Receipt_item.update(target , data);

			

		} catch (err) {

			console.log(err);

		}

	})

	socket.on('delete-receipt_item' , async(data) => {

		try{

			let target = await Receipt_item.find({ _id : data._objectId });
			let data = await Receipt_item.delete(target , data);

			

		} catch (err) {

			console.log(err);

		}

	})

	

};
