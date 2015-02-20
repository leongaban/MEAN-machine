angular.module('stuffService', [])
.factory('Stuff', function($http) {

	/*

	• get a single user
	• get a list of all users • create a user
	• update a user
	• delete a user
 
	Node API                                   Angular Service
	single user:   GET /api/users/:user_id     get(id)
	list users:    GET /api/users              all()
	create user:   POST /api/users             create(userData)
	update a user: PUT /api/users/:user_id     update(id, userData)
	delete user:   DELETE /api/users/:user_id  delete(id)
	   
	*/

	// create the object
	var myFactory = {};

	// a function to get all the stuff
	myFactory.all = function() {
		return $http.get('/api/stuff');
	};

	return myFactory;
});
