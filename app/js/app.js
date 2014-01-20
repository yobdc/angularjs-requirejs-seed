define([
	'angular',
	'filters',
	'services',
	'providers',
	'directives',
	'controllers',
	'angularRoute'
	], function (angular, filters, services, providers, directives, controllers) {
		'use strict';

		// Declare app level module which depends on filters, and services
		
		return angular.module('myApp', [
			'ngRoute',
			'myApp.controllers',
			'myApp.filters',
			'myApp.services',
			'myApp.providers',
			'myApp.directives'
		]);
});
