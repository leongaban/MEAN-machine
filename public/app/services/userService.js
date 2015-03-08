angular.module('userService', [])
.factory('User', function($http) {

	/*

	• get a single user
	• get a list of all users • create a user
	• update a user
	• delete a user
 
	Node API                                   Angular Service
	single user:   GET /api/users/:user_id     get(id)
	list users:    GET /api/users              all()
	create user:   POST /api/users             postUser(userData)
	update a user: PUT /api/users/:user_id     update(id, userData)
	delete user:   DELETE /api/users/:user_id  deleteUser(id)
	   
	*/

	// create the object
	var userFactory = {};

	// get a single user
	userFactory.get = function(id) {
		return $http.get('/api/users/' + id);
	};

	// a function to get all the stuff
	userFactory.all = function() {
		console.log('get all users...');
		return $http.get('/api/users');
	};

	// create a user
	userFactory.create = function(userData) {
		return $http.post('/api/users/', userData);
	};

	// update a user
	userFactory.update = function(id, userData) {
		return $http.put('/api/users/' + id, userData);
	};

	// delete a user
	userFactory.delete = function(id) {
		return $http.delete('/api/users/' + id);
	};


	return userFactory;
});
