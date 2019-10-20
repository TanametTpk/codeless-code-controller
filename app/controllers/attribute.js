const attribute = require('../classes/attribute');

exports.get = async (req , res) => {

	try {

		attributeTarget = await attribute.findManyAndPopulate(req.query , req._populate);

		res.success(attributeTarget);

	} catch (err){
		res.preconditionFailed();
	}

};

exports.getPagination = async (req , res) => {

	try {

		attributeTarget = await attribute.findManyAndPopulate(req.query , req._populate , req._page , req._size );
		res.success(attributeTarget);

	} catch (err){
		res.preconditionFailed();
	}

};

exports.getSpecific = async (req , res) => {

	try {

		let attributeTarget = await attribute.find( {_id: req._objectId } , req._populate );
		attributeTarget = await attribute.wrap( attributeTarget );
		res.success(attributeTarget);

	} catch (err){
		res.preconditionFailed();
	}

};

exports.create = async (req , res) => {

	try{

		const saved = await attribute.create(req.body);
		res.success(saved);

	} catch (err){
		res.repeat();
	}

};

exports.update = async (req , res) => {

	try {

		let target = await attribute.find({ _id : req._objectId });
		let updatedObj = await attribute.update(target , req.body);
		updatedObj = await attribute.wrap( updatedObj );
		res.success(updatedObj);

	} catch (err){
		res.preconditionFailed();
	}

};

exports.delete = async (req , res) => {

	try {

		let target = await attribute.find({ _id : req._objectId });
		let deletedObj = await attribute.deleteObj(target);
		deletedObj = await attribute.wrap( deletedObj );
		res.success(deletedObj);

	} catch (err){
			res.preconditionFailed();
	}

};



