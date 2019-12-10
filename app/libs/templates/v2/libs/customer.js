const Model = require( "mongoose" ).model( "customer" );
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/env/jwt');
const editable = require('../config/permission')

const modelPermission = editable["customer"]

const find = (query , populate) => {

	let result = Model.findOne(query)

	if (populate) result = result.populate(populate);
	return result

}

const findManyAndPopulate = (query , populate , skip , limit) => {

	if (!skip) skip = 0
	if (!limit) limit = 1000

	let result = Model.find(query , modelPermission.getable.join(",")).limit(limit).skip(skip * limit);

	if (populate) result = result.populate(populate);
	return result

}

const create = (data) => {

	const model = new Model(data);
	model.setPassword(data.password)

	return model.save();

};

const update = ( model, data ) => {

	const whiteList = modelPermission.updatable
	const currentModel = model;

	whiteList.map((key) => {

		if (data[key] === modelPermission.validateKey){
			currentModel.setPassword(data[key])
			return
		}

		if (data[key]) currentModel._doc[key] = data[key]

	})


	return currentModel.save();

};

const deleteObj = ( model ) => model.remove();
const deleteObjMany = ( query ) => Model.deleteMany(query);

const wrap = (model) => {

	if (model === null) return {};
	const whiteList = modelPermission.getable

	let wrappedModel = {}
	whiteList.map((key) => {
		wrappedModel[key] = model[key]
	})

	return wrappedModel

}

const validatePassword = (model , password) => {

	if (model === null) return null;
	if ( !model.validatePassword(password) ) return null;

	const whiteList = modelPermission.jwtPayload

	let auth = {};
	whiteList.map((key) => {
		auth[key] = model[key]
	})

	return jwt.sign(auth , jwtConfig.jwt_secret);

}


module.exports = {
	find,
	findManyAndPopulate,
	create,
	update,
	deleteObj,
	wrap,
	validatePassword,
	deleteObjMany

};
