var mongoose = require("mongoose");
var Schema = require("mongoose").Schema;
var Encoder = require("./libs/Encoder")

var databaseMetaSchema = Schema({

	name : { type:String, required : true, lowercase: true, trim: true },
	project : { type:String, required : true},

})

module.exports = mongoose.model('databaseMeta', databaseMetaSchema)