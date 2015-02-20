/*global angular*/

// name our angular app
var app = angular.module('myApp', 
	['ngRoute', 'routerRoutes', 'ngAnimate', 'stuffService'])

// controller for ENTIRE site
.controller('mainController', function(Stuff) {

	var vm = this;
	console.log(vm);

	// get all the stuff
	Stuff.all()
		// promise object
		.success(function(data) {
			// bind the data to a controller variable
			// this comes from the stuffService
			vm.stuff = data;
			console.log(vm);
		});
})

// home page specific controller
.controller('homeController', function() {
	
	var vm = this;
	vm.message = 'This is the home page!';
})

// about page controller
.controller('aboutController', function() {

	var vm = this;
	vm.message = 'Look! I am an about page.';
})

// contact page controller
.controller('contactController', function() {
	
	var vm = this;
	vm.message = 'Contact us! JK. This is just a demo.';
});
