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
            mocks.module('myApp.services');
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
            mocks.module('myApp.services');
		});
		it('should toPostData', function() {
			var supplier = new supplierModel();
			expect(supplier.toPostData()).not.toBe(null);
		});
        it('should construct loadNew', mocks.inject(function(URL_PREFIX, _$httpBackend_, $q) {
            var $httpBackend;
            $httpBackend =_$httpBackend_;
            expect(URL_PREFIX).not.toBe(null);
            $httpBackend.expect("GET",URL_PREFIX+'resources/dds/ContactInfo.Telephone').respond({
                name: '1'
            });
            $httpBackend.expect("GET",URL_PREFIX+'resources/dds/ContactInfo.Mobile').respond({
                name: '2'
            });
            $httpBackend.expect("GET",URL_PREFIX+'resources/dds/ContactInfo.Fax').respond({
                name: '3'
            });
            $httpBackend.expect("GET",URL_PREFIX+'resources/dds/ContactInfo.Mail').respond({
                name: '4'
            });
            $httpBackend.expect("GET",URL_PREFIX+'resources/dds/ContactInfo.URL').respond({
                name: '5'
            });

            var supplier = new supplierModel();
            // $httpBackend.flush();
            expect(supplier.firstName).toBe(null);
            expect(supplier.lastName).toBe(null);
            expect(angular.isArray(supplier.telephones)).toBe(true);
        }));
	});
});