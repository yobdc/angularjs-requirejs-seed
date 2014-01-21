/*global describe beforeEach it expect */

define([
    'angular',
    'angularMocks',
    'app'
], function (angular, mocks, app) {
    'use strict';

    describe('ValidatorService', function () {
        beforeEach(function () {
            mocks.module('myApp.services')
        });
        it('should validate email successfully', mocks.inject(function (ValidatorService) {
            expect(ValidatorService.email()).not.toEqual(true);
            expect(ValidatorService.email('')).not.toEqual(true);
            expect(ValidatorService.email(111)).not.toEqual(true);
            expect(ValidatorService.email(null)).not.toEqual(true);
            expect(ValidatorService.email('aa')).not.toEqual(true);
            expect(ValidatorService.email('aa@aa')).not.toEqual(true);
            expect(ValidatorService.email('aa@aa.com')).toEqual(true);
        }));
        it('should validate phone successfully', mocks.inject(function (ValidatorService) {
            expect(ValidatorService.phone()).not.toEqual(true);
            expect(ValidatorService.phone('')).not.toEqual(true);
            expect(ValidatorService.phone(111)).not.toEqual(true);
            expect(ValidatorService.phone(null)).not.toEqual(true);
            expect(ValidatorService.phone('123')).not.toEqual(true);
            expect(ValidatorService.phone('11111111')).toEqual(true);
            expect(ValidatorService.phone('123456789')).toEqual(true);
            expect(ValidatorService.phone('021-11111111')).toEqual(true);
            expect(ValidatorService.phone('01 2345 6789')).toEqual(true);
            expect(ValidatorService.phone('01-2345-6789')).toEqual(true);
            expect(ValidatorService.phone('1234-5678')).toEqual(true);
            expect(ValidatorService.phone('+61 01 2345 6789')).toEqual(true);
            expect(ValidatorService.phone('+61 z1 2345 6789')).not.toEqual(true);
            expect(ValidatorService.phone('(01) 2345 6789')).toEqual(true);
            expect(ValidatorService.phone('(01) 2345-6789')).toEqual(true);
            expect(ValidatorService.phone('(01) 2345-678z')).not.toEqual(true);
        }));
        it('should validate url successfully', mocks.inject(function (ValidatorService) {
            expect(ValidatorService.url()).not.toEqual(true);
            expect(ValidatorService.url('')).not.toEqual(true);
            expect(ValidatorService.url(111)).not.toEqual(true);
            expect(ValidatorService.url(null)).not.toEqual(true);
            expect(ValidatorService.url('www.kodak.com')).toEqual(true);
            expect(ValidatorService.url('http://www.kodak.com')).toEqual(true);
            expect(ValidatorService.url('https://www.kodak.com')).toEqual(true);
            expect(ValidatorService.url('httpssss://www.kodak.com')).not.toEqual(true);
            expect(ValidatorService.url('ftp://www.kodak.com')).not.toEqual(true);
            expect(ValidatorService.url('com')).not.toEqual(true);
            expect(ValidatorService.url('zzz')).not.toEqual(true);
        }));
        it('should validate fax successfully', mocks.inject(function (ValidatorService) {
            expect(ValidatorService.fax()).not.toEqual(true);
            expect(ValidatorService.fax('')).not.toEqual(true);
            expect(ValidatorService.fax(111)).not.toEqual(true);
            expect(ValidatorService.fax(null)).not.toEqual(true);
            expect(ValidatorService.fax('www.kodak.com')).not.toEqual(true);
            expect(ValidatorService.fax('+123456789')).toEqual(true);
            expect(ValidatorService.fax('123456789')).toEqual(true);
            expect(ValidatorService.fax('++123456789')).not.toEqual(true);
        }));
    });

    describe('DdsFactory', function () {

        beforeEach(function () {
            mocks.module('myApp.services')
        });

        it('should accept Array for param0', mocks.inject(function (DdsFactory) {
            try {
                DdsFactory.get(123);
            } catch (ex) {
                expect(ex.message).toEqual('param0 is not Array');
            }
            try {
                DdsFactory.get();
            } catch (ex) {
                expect(ex.message).toEqual('param0 is not Array');
            }
            try {
                DdsFactory.get([
                    {name: 123}
                ]);
            } catch (ex) {
                expect(ex.message).toEqual('all array member should be string');
            }
        }));
        it('should return promises', mocks.inject(function (URL_PREFIX, DdsFactory, _$httpBackend_, $q) {
            var $httpBackend =_$httpBackend_;
            expect(URL_PREFIX).not.toBe(null);
            $httpBackend.when("GET",URL_PREFIX+'resources/dds/zzz').respond({
                name: 'zzz'
            });
            $httpBackend.when("GET",URL_PREFIX+'resources/dds/yyy').respond({
                name: 'yyy'
            });
            var promises = DdsFactory.get(['zzz','yyy']);
            $httpBackend.flush();
            $q.all(promises).then(function(values){
                expect(values.length).toEqual(2);
            });
        }));
    });
});