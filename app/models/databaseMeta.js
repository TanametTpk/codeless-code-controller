var mongoose = require("mongoose");
var Schema = require("mongoose").Schema;
var Encoder = require("./libs/Encoder")

var databaseMetaSchema = Schema({

	name : { type:String, required : true, trim: true },
	project : { type:String, required : true},

})

databaseMetaSchema.index({ name:1 , project:1 } , {unique: true});

module.exports = mongoose.model('databaseMeta', databaseMetaSchema)