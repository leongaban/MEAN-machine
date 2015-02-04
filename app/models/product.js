// grab the packages that we need for the user model
var mongoose   = require('mongoose'); 	   // for working w/ our database
var Schema 	   = mongoose.Schema;
var bcrypt 	   = require('bcrypt-nodejs');

// SCHEMAS ------------------------------------
// user schema
var productSchema = new Schema({
	name: String,

	// ^ select false will not return passwords
});

module.exports = mongoose.model('Product', productSchema);


