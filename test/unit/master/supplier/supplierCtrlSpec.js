/*global describe beforeEach it expect */

define([
	'angular',
	'angularMocks',
	'app'
], function(angular, mocks, app) {
	'use strict';

	describe('SupplierCtrl', function(){
		var SupplierCtrl, scope;

		beforeEach(function() {
			mocks.module('myApp.controllers');
			mocks.inject(function($rootScope, $controller) {
				scope = $rootScope.$new();
				SupplierCtrl = $controller('SupplierCtrl', {
					$scope: scope
				});
			});
		});
	});
});