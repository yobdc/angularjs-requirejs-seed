define(['angular', 'app'], function(angular, app) {
    'use strict';

    return app.config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/supplier/create', {
                templateUrl: 'app/views/master/supplier/supplier.html',
                controller: 'SupplierCtrl'
            }).when('/supplier/create/addOrEditContact/:contactId', {
                templateUrl: 'app/views/master/supplier/addContact.html',
                controller: 'SupplierContactCtrl'
            }).when('/position/create', {
			templateUrl: 'app/views/master/position/position.html',
			controller: 'PositionCtrl'
            });
            $routeProvider.otherwise({redirectTo: '/supplier/create'});
        }]);
});