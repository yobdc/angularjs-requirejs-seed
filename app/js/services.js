define(['angular', 'angularResource'], function (angular) {
    'use strict';

    /* Services */

    // Demonstrate how to register services
    // In this case it is a simple value service.
    var urlPrefix = '../';
    return angular.module('myApp.services', ['ngResource'])
        .value('version', '0.0.1')
        .constant('URL_PREFIX', urlPrefix)
        // - Common util api definitions start
        .factory('ValidatorService', [function () {
            return {
                email: function email(str) {
                    if (typeof str === 'string') {
                        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
                    }
                },
                phone: function phone(str) {
                    if (typeof str === 'string') {
                        return /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/.test(str);
                    }
                },
                url: function url(str) {
                    if (typeof str === 'string') {
                        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(str);
                    }
                },
                fax: function fax(str) {
                    if (typeof str === 'string') {
                        return /^\+?[0-9]+$/.test(str);
                    }
                }
            };
        }])
        // - Common util api definitions end
        // - Restful api definitions start
        // -- Common Restful api definitions start
        // -- Common Restful api definitions end
        // -- Master Restful api definitions start
        .factory('DDService', ['$resource', function ($resource) {
            return $resource(urlPrefix + 'resources/dds/:key', {}, {
                get: {
                    method: 'GET',
                    params: {
                        key: 'key'
                    }
                }
            });
        }])
        // --- Get dds array
        .factory('DdsFactory', ['DDService', '$q', function(DDService, $q){
            return {
                get: function (list) {
                    var promises = [];
                    if (angular.isArray(list)) {
                        for (var i = 0; i < list.length; i++) {
                            var dds = list[i];
                            if(angular.isString(dds)){
                                var q = $q.defer();
                                DDService.get({
                                    key: dds
                                }, function (data) {
                                    q.resolve(data);
                                }, function (data) {
                                    q.resolve();
                                });
                                promises.push(q.promise);
                            } else {
                                throw Error('all array member should be string');
                            }
                        }
                    } else {
                        throw Error('param0 is not Array');
                    }
                    return promises;
                }
            };
        }]);
    // -- Master Restful api definitions end
    // - Restful api definitions end
});
