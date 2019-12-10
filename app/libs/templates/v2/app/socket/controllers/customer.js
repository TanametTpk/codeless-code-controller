const customer = require('../../../services/customer');

module.exports = (socket) => {

	socket.on('create-customer' , async(data , res) => {

		try{

			res(await customer.create(data))
			

		} catch (err) {

			console.log(err);

		}

	})

	socket.on('update-customer' , async(data, res) => {

		try{

			res(await customer.update(data))

		} catch (err) {

			console.log(err);

		}

	})

	socket.on('delete-customer' , async(data, res) => {

		try{

			res(await customer.delete(data))

		} catch (err) {

			console.log(err);

		}

	})

	socket.on('customer-validate' , async(data , res) => {

		// const validate = require("../../../config/middlewares/socketValidateToken")

		try{

			// validate(socket , data)
			res(await customer.validate(data))

		} catch (err) {

			console.log(err);

		}

	})

};
