/*global describe beforeEach it expect */

define([
	'angular',
	'angularMocks',
	'app',
	'models/master/supplier'
], function(angular, mocks, app, supplierModel) {
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

	describe('SupplierProvider', function(){
		beforeEach(function() {
		});
		it('should validate email successfully', function() {
			var supplier = new supplierModel();
			console.log(supplier.toPostData());
			expect(supplier.toPostData()).not.toBe(null);
		});
	});
});