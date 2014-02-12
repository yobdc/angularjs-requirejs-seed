define(['angular', 'app'], function(angular, app) {
    'use strict';

    return app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/supplier/board', {
                templateUrl: 'app/views/master/supplier/supplierBoard.html',
                controller: 'SupplierListCtrl',
            }).when('/supplier/list', {
                templateUrl: 'app/views/master/supplier/supplierList.html',
                controller: 'SupplierListCtrl',
            }).when('/supplier/create', {
                templateUrl: 'app/views/master/supplier/supplier.html',
                controller: 'SupplierCtrl',
            }).when('/supplier/create/addOrEditContact', {
                templateUrl: 'app/views/master/supplier/addContact.html',
                controller: 'SupplierAddContactCtrl'
            }).when('/supplier/create/addOrEditSite', {
                templateUrl: 'app/views/master/supplier/addSite.html',
                controller: 'SupplierAddSiteCtrl'
            }).when('/position/create', {
                templateUrl: 'app/views/master/position/position.html',
                controller: 'PositionCtrl'
            }).when('/organization', {
                templateUrl: 'app/views/master/organization/organizationStructure.html',
                controller: 'organizationStructureCtrl'
            }).otherwise({
                redirectTo: '/supplier/create'
            });
        }
    ]);
});