define(['angular', 'app'], function(angular, app) {
    'use strict';

    return app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/supplier', {
                templateUrl: 'app/views/master/supplier/index.html',
                controller: 'SupplierCtrl'
            }).when('/supplier/board', {
                templateUrl: 'app/views/master/supplier/supplierBoard.html',
                controller: 'SupplierListCtrl'
            }).when('/supplier/list', {
                templateUrl: 'app/views/master/supplier/supplierList.html',
                controller: 'SupplierListCtrl'
            }).when('/supplier/detail', {
                templateUrl: 'app/views/master/supplier/supplierDetail.html',
                controller: 'SupplierDetailCtrl'
            }).when('/supplier/create', {
                templateUrl: 'app/views/master/supplier/supplier.html',
                controller: 'SupplierCtrl'
            }).when('/supplier/edit/:guid', {
                templateUrl: 'app/views/master/supplier/supplier.html',
                controller: 'SupplierCtrl'
            }).when('/supplier/create/addOrEditContact', {
                templateUrl: 'app/views/master/supplier/addContact.html',
                controller: 'SupplierAddContactCtrl'
            }).when('/supplier/create/addOrEditSite', {
                templateUrl: 'app/views/master/supplier/addSite.html',
                controller: 'SupplierAddSiteCtrl'
            }).when('/supplier/contact', {
                templateUrl: 'app/views/master/supplier/contactReadOnly.html',
                controller: 'SupplierAddContactCtrl'
            }).when('/supplier/site', {
                templateUrl: 'app/views/master/supplier/siteReadOnly.html',
                controller: 'SupplierAddSiteCtrl'
            })
            //router for supplier material
            .when('/supplier/material/list', {
                templateUrl: 'app/views/master/supplier/material.html',
                controller: 'SupplierMaterialCtrl'
            })
            .when('/supplier/material/addOrEdit', {
                templateUrl: 'app/views/master/supplier/addMaterial.html',
                controller: 'SupplierAddMaterialCtrl'
            })            
            .when('/position/position/list', {
                templateUrl: 'app/views/master/position/position.html',
                controller: 'PositionCtrl'
            }).when('/organization', {
                templateUrl: 'app/views/master/organization/organizationStructure.html',
                controller: 'organizationStructureCtrl'
            }).when('/user',{
                templateUrl: 'app/views/master/user/userList.html',
                controller: 'userController'
            }).when('/user/create',{
                templateUrl: 'app/views/master/user/addUser.html',
                controller: 'userAddCtrl'
            }).when('/role',{
                templateUrl: 'app/views/master/role/roleList.html',
                controller: 'roleCtrl'
            }).when('/role/create',{
                templateUrl: 'app/views/master/role/addRole.html',
                controller: 'roleAddCtrl'
            }).when('/permission/group',{
                templateUrl: 'app/views/master/permission/groupList.html',
                controller: 'permissionGroupCtrl'
            }).when('/permission/group/create',{
                templateUrl: 'app/views/master/permission/addGroup.html',
                controller: 'permissionGroupAddCtrl'
            })
            .otherwise({
                redirectTo: '/supplier/create'
            });
        }
    ]);
});