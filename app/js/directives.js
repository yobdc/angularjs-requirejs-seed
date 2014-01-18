define(['angular', 'services', 'jquery', 'bootstrap'], function(angular, services) {
	'use strict';

  /* Directives */

	angular.module('myApp.directives', ['myApp.services'])
		.directive('appVersion', ['version', function(version) {
			return function(scope, elm, attrs) {
				elm.text(version);
		};
	}]);
});