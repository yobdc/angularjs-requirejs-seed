define([
	'angular',
	'filters',
	'services',
	'models',
	'directives',
	'controllers',
	'angularRoute',
    'angularAnimate',
    'angularTouch'
	], function (angular, filters, services, models, directives, controllers) {
		'use strict';

		// Declare app level module which depends on filters, and services
		
		return angular.module('myApp', [
			'ngRoute',
			'ngTouch',
			'ngAnimate',
			'myApp.controllers',
			'myApp.filters',
			'myApp.services',
			'myApp.models',
			'myApp.directives'
		]);
});
