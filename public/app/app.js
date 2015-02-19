/*global angular*/

// name our angular app
var app = angular.module('routerApp', ['ngRoute', 'routerRoutes', 'ngAnimate'])

// controller for ENTIRE site
.controller('mainController', function() {

	// bind this to vm (view-model)
	var vm = this;

	// define a basic variable
	vm.bigMessage = 'A smooth sea never made a skilled sailor.';
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
