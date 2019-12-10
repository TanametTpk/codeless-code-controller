var mongoose = require("mongoose");
var Schema = require("mongoose").Schema;
var Encoder = require("../libs/Encoder")

var customerSchema = Schema({

	email : { type:String, required : true},
	password : { type:String, required : true},
	name : { type:String, required : true, trim : true},
	birth : { type:Date},
	hobby : { type:String},
	price : { type:Number},
	created_at : { type:Date , default :Date.now},

})

customerSchema.index({ email:1 } , {unique: true});

customerSchema.methods.setPassword = function( password ){
	this.password = Encoder.encrypt(password);
}

customerSchema.methods.validatePassword = function( password ){
	return Encoder.validate(password , this.password);
}

module.exports = mongoose.model('customer', customerSchema)