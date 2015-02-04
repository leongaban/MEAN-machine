/*global angular*/

// name our angular app
var app = angular.module('firstApp', [])

// controller for ENTIRE site
.controller('mainController', function() {

	// bind this to vm (view-model)
	var vm = this;

	// define a basic variable
    vm.message = 'Hey there! Come and see how good I look!';

    vm.computers = [
        { name: 'Macbook Pro', color: 'Silver', nerdness: 7 },
        { name: 'Yoga 2 Pro', color: 'Gray', nerdness: 6 },
        { name: 'Chromebook', color: 'Black', nerdness: 5 }
	];

	// information that comes from our form
	vm.computerData = {};

	vm.addComputer = function() {
		// add a computer to the list
		vm.computers.push({
			name: vm.computerData.name,
			color: vm.computerData.color,
			nerdness: vm.computerData.nerdness
		});
	}

	// after our computer has been added, clear the form
	vm.computerData = {};

});
