var mongoose = require("mongoose");
var Schema = require("mongoose").Schema;
var Encoder = require("./libs/Encoder")

var attributeSchema = Schema({

	name : { type:String, required : true, trim : true},
	type : { type:String, required : true, lowercase : true, default:"string"},
	default : { type:String},
	require : { type:Boolean},
	lowercase : { type:Boolean},
	trim : { type:Boolean},
	max : { type:Number},
	min : { type:Number},
	unique : { type:Boolean},
	encrypt : { type:Boolean},
	disableUpdate : { type:Boolean},
	disableGet : { type:Boolean},
	auth : { type:Boolean},
	id : { type:Boolean},
	ref : { type:mongoose.Schema.Types.ObjectId , ref: 'databaseMeta'},
	subObjects : { type:mongoose.Schema.Types.ObjectId , ref: 'attribute'},
	databaseMeta : { type:mongoose.Schema.Types.ObjectId , ref: 'databaseMeta', required : true},

})

attributeSchema.index({ name:1 , databaseMeta:1 } , {unique: true});

module.exports = mongoose.model('attribute', attributeSchema)