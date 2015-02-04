/*global angular*/

// name our angular app
var app = angular.module('routerApp', ['ngRoute'])

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
})


// inject ngRoute for all our routing needs
// angular.module('routerRoutes', ['ngRoute'])
// configure our routes
.config(function($routeProvider, $locationProvider) {
	$routeProvider
	
		// route for the home page
	    .when('/', {
	        templateUrl : 'views/pages/home.html',
	        controller  : 'homeController',
	        controllerAs: 'home'
		})
		// route for the about page
		.when('/about', {
			templateUrl : 'views/pages/about.html',
			controller  : 'aboutController',
			controllerAs: 'about'
		})
		// route for the contact page
		.when('/contact', {
			templateUrl : 'views/pages/contact.html',
			controller  : 'contactController',
			controllerAs: 'contact'
		});

	// set our app up to have pretty URLS
	$locationProvider.html5Mode(true);
});






