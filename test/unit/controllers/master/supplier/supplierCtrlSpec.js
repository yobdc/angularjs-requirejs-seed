/*global describe beforeEach it expect */

define([
	'angular',
	'angularMocks',
	'app',
	'models/master/supplier',
	'angularRoute'
], function(angular, mocks, app, supplierModel) {
	'use strict';

	describe('SupplierCtrl', function(){
		var SupplierCtrl, scope;

		beforeEach(function() {
			mocks.module('myApp.controllers');
			mocks.module('ngRoute');
			mocks.inject(function($rootScope, $controller, $routeParams) {
				scope = $rootScope.$new();
				SupplierCtrl = $controller('SupplierCtrl', {
					$scope: scope,
					$routeParams: $routeParams
				});
			});
		});
        it('should ok', mocks.inject(function() {
        }));
	});

	describe('SupplierProvider', function(){
		beforeEach(function() {
		});
		it('should validate email successfully', function() {
			var supplier = new supplierModel();
			expect(supplier.toPostData()).not.toBe(null);
		});
	});
});