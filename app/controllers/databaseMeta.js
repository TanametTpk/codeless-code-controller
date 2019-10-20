const databaseMeta = require('../classes/databaseMeta');

exports.get = async (req , res) => {

	try {

		databaseMetaTarget = await databaseMeta.findManyAndPopulate(req.query , req._populate);

		res.success(databaseMetaTarget);

	} catch (err){
		res.preconditionFailed();
	}

};

exports.getPagination = async (req , res) => {

	try {

		databaseMetaTarget = await databaseMeta.findManyAndPopulate(req.query , req._populate , req._page , req._size );
		res.success(databaseMetaTarget);

	} catch (err){
		res.preconditionFailed();
	}

};

exports.getSpecific = async (req , res) => {

	try {

		let databaseMetaTarget = await databaseMeta.find( {_id: req._objectId } , req._populate );
		databaseMetaTarget = await databaseMeta.wrap( databaseMetaTarget );
		res.success(databaseMetaTarget);

	} catch (err){
		res.preconditionFailed();
	}

};

exports.create = async (req , res) => {

	try{

		const saved = await databaseMeta.create(req.body);
		res.success(saved);

	} catch (err){
		res.repeat();
	}

};

exports.update = async (req , res) => {

	try {

		let target = await databaseMeta.find({ _id : req._objectId });
		let updatedObj = await databaseMeta.update(target , req.body);
		updatedObj = await databaseMeta.wrap( updatedObj );
		res.success(updatedObj);

	} catch (err){
		res.preconditionFailed();
	}

};

exports.delete = async (req , res) => {

	try {

		let target = await databaseMeta.find({ _id : req._objectId });
		let deletedObj = await databaseMeta.deleteObj(target);
		deletedObj = await databaseMeta.wrap( deletedObj );
		res.success(deletedObj);

	} catch (err){
			res.preconditionFailed();
	}

};



