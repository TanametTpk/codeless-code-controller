const DatabaseMeta = require( "mongoose" ).model( "databaseMeta" );

const find = (query , populate) => {

	let result = DatabaseMeta.findOne(query)

	if (populate) result = result.populate(populate);
	return result

}

const findManyAndPopulate = (query , populate , skip , limit) => {

	if (!skip) skip = 0
	if (!limit) limit = 1000

	let result = DatabaseMeta.find(query , "name , box").limit(limit).skip(skip * limit);

	if (populate) result = result.populate(populate);
	return result

}

const create = (data) => {

	const databaseMeta = new DatabaseMeta(data);

	return databaseMeta.save();

};

const update = ( databaseMeta, data ) => {

	const { name , box } = data;
	const current = databaseMeta;

	if (name) current.name = name;
	if (box) current.box = box;


	return databaseMeta.save();

};

const deleteObj = ( databaseMeta ) => databaseMeta.remove();

const wrap = (databaseMeta) => {

	if (databaseMeta === null) return {};
	const { _id , name , box } = databaseMeta;

	return { _id , name , box };

}



module.exports = {
	find,
	findManyAndPopulate,
	create,
	update,
	deleteObj,
	wrap,

};
