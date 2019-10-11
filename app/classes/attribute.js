const Attribute = require( "mongoose" ).model( "attribute" );

const find = (query , populate) => {

	let result = Attribute.findOne(query)

	if (populate) result = result.populate(populate);
	return result

}

const findManyAndPopulate = (query , populate , skip , limit) => {

	if (!skip) skip = 0
	if (!limit) limit = 1000

	let result = Attribute.find(query , "name , type , _default , require , lowercase , trim , max , min , unique , encrypt , disableUpdate , disableGet , auth , id , ref , subObjects , databaseMeta").limit(limit).skip(skip * limit);

	if (populate) result = result.populate(populate);
	return result

}

const create = (data) => {

	const attribute = new Attribute(data);

	return attribute.save();

};

const update = ( attribute, data ) => {

	const { name , type , _default , require , lowercase , trim , max , min , unique , encrypt , disableUpdate , disableGet , auth , id , ref , subObjects , databaseMeta } = data;
	const currentAttribute = attribute;

	if (name) currentAttribute.name = name;
	if (type) currentAttribute.type = type;
	if (_default) currentAttribute._default = _default;
	if (require) currentAttribute.require = require;
	if (lowercase) currentAttribute.lowercase = lowercase;
	if (trim) currentAttribute.trim = trim;
	if (max) currentAttribute.max = max;
	if (min) currentAttribute.min = min;
	if (unique) currentAttribute.unique = unique;
	if (encrypt) currentAttribute.encrypt = encrypt;
	if (disableUpdate) currentAttribute.disableUpdate = disableUpdate;
	if (disableGet) currentAttribute.disableGet = disableGet;
	if (auth) currentAttribute.auth = auth;
	if (id) currentAttribute.id = id;
	if (ref) currentAttribute.ref = ref;
	if (subObjects) currentAttribute.subObjects = subObjects;
	if (databaseMeta) currentAttribute.databaseMeta = databaseMeta;


	return attribute.save();

};

const deleteObj = ( attribute ) => attribute.remove();

const wrap = (attribute) => {

	if (attribute === null) return {};
	const { _id , name , type , _default , require , lowercase , trim , max , min , unique , encrypt , disableUpdate , disableGet , auth , id , ref , subObjects , databaseMeta } = attribute;

	return { _id , name , type , _default , require , lowercase , trim , max , min , unique , encrypt , disableUpdate , disableGet , auth , id , ref , subObjects , databaseMeta };

}



module.exports = {
	find,
	findManyAndPopulate,
	create,
	update,
	deleteObj,
	wrap,

};
