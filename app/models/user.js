// grab the packages that we need for the user model
var mongoose   = require('mongoose'); 	   // for working w/ our database
var Schema 	   = mongoose.Schema;
var bcrypt 	   = require('bcrypt-nodejs');

// SCHEMAS ------------------------------------
// user schema
var UserSchema = new Schema({
	name: String,
	username: { type: String, required: true, index: { unique: true }},
	password: { type: String, required: true, select: false }
	// ^ select false will not return passwords
});


// hash the password before the user is saved
UserSchema.pre('save', function(next) {
	var user = this;

	// PUT username
	if (!user.isModified('username')) return next();

	// PUT name
	if (!user.isModified('name')) return next();

	// hash the password only if the password has been changed or user is new
	if (!user.isModified('password')) return next();

	// generate the salt
	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) return next(err);

		// change the password to the hashed version
		user.password = hash;
		next();
	});
});

// method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password) {
	var user = this;

	return bcrypt.compareSync(password, user.password);
};

// return the model
module.exports = mongoose.model('User', UserSchema);


