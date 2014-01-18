define(['angular', 'angularResource'], function (angular) {
	'use strict';
	
  /* Services */

  // Demonstrate how to register services
  // In this case it is a simple value service.
	angular.module('myApp.services', ['ngResource'])
		.value('version', '0.0.1')
		.factory('DDService', function($resource) {
		    return $resource('resources/dds/:key', {}, {
		        get: {
		            method: 'GET',
		            params: {
		                key: 'key'
		            }
		        }
		    });    
		});
});
