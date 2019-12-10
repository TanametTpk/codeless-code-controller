const customer = require('../libs/customer');
const IdentifyError = require('../config/errors/IdentifyError')

exports.get = async (req) => {

	let cus = await customer.findManyAndPopulate(req.query , req._populate);
	return cus;
	
};

exports.getPagination = async (req)=> {

	return await customer.findManyAndPopulate(req.query , req._populate , req._page , req._size );

};

exports.getSpecific = async (req)=> {

	let customerTarget = await customer.find( {_id: req._objectId } , req._populate );
	customerTarget = await customer.wrap( customerTarget );
	return customerTarget
};

exports.create = async (req)=> {

	return await customer.create(req.body);

};

exports.update = async (req)=> {

	let target = await customer.find({ _id : req._objectId });
	let updatedObj = await customer.update(target , req.body);
	return await customer.wrap( updatedObj )

};

exports.delete = async (req)=> {

	let target = await customer.find({ _id : req._objectId });
	let deletedObj = await customer.deleteObj(target);
	return customer.wrap( deletedObj );

};

exports.deleteMany = async (req)=> {

	return await customer.deleteObjMany(req.query)

};

exports.validate = async (req)=> {

	let { email , password } = req.body; 

	let target = await customer.find({ email });
	let token = await customer.validatePassword(target ,password);

	if (token){

		return {
			customer : customer.wrap(target),
			token : token
		}
		
	}else{

		throw new IdentifyError("identify not match")

	}

}


