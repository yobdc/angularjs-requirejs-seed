/*global describe beforeEach it expect */

define([
    'angular',
    'angularMocks',
    'app',
    'models/master/supplier'
], function(angular, mocks, app, supplierModel) {
    'use strict';

    describe('SupplierProvider', function() {
        beforeEach(function() {
            mocks.module('myApp.services');
        });
        it('should toPostData', function() {
            var supplier = new supplierModel();
            expect(supplier.toPostData()).not.toBe(null);
        });
        it('should construct loadNew', mocks.inject(function(URL_PREFIX, _$httpBackend_, $q) {
            var $httpBackend;
            $httpBackend = _$httpBackend_;
            expect(URL_PREFIX).not.toBe(null);
            $httpBackend.when("GET", '/resources/dds/ContactInfo.Type').respond({
                name: '5'
            });

            var supplier = new supplierModel();
            // $httpBackend.flush();
            expect(supplier.firstName).toBe(null);
            expect(supplier.lastName).toBe(null);
            expect(angular.isArray(supplier.contactInfo)).toBe(true);
        }));
        it('should add contact info', mocks.inject(function(URL_PREFIX, _$httpBackend_, DDService) {
            var $httpBackend;
            $httpBackend = _$httpBackend_;
            expect(URL_PREFIX).not.toBe(null);
            $httpBackend.when("GET", URL_PREFIX+'resources/dds/ContactInfo.Type').respond({
                keyword: 'ContactInfo.Type',
                options: [{
                    code: 'A',
                    name: 'A'
                }, {
                    code: 'B',
                    name: 'B'
                }]
            });
            // DDService.get({
            //     key: 'ContactInfo.Type'
            // }, function(data) {
            //     console.log(data);
            // }, function(data) {
            //     console.log(data);
            // });
            var s = new supplierModel();
            // $httpBackend.flush();
            // var result = s.addContactInfo();
            // console.log(result);
        }));
    });
});