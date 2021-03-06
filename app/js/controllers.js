define([
    'angular',
    'services',
    'jquery',
    'angularBootstrap',
], function(angular) {
    'use strict';

    /* Controllers */

    return angular.module('myApp.controllers', [
        'myApp.services',
        'ui.bootstrap',
        // 'mgcrea.ngStrap'
    ])
    .controller('MainCtrl', ['$scope', '$rootScope', '$window', '$location', function ($scope, $rootScope, $window, $location) {
        $scope.slide = '';
        $rootScope.back = function() {
          $scope.slide = 'slide-right';
          $window.history.back();
        }
        $rootScope.go = function(path){
          $scope.slide = 'slide-left';
          $location.url(path);
        }
    }])
    .controller('SupplierListCtrl',[
        '$scope',
        '$injector',
        '$timeout',
        '$location',
        function($scope, $injector, $timeout, $location){
            require([
                'controllers/master/supplier/supplierListCtrl'
            ], function(controller){
                $injector.invoke(controller, this, {
                    '$scope': $scope,
                    '$timeout': $timeout,
                    '$location': $location
                });
            });
        }
    ])
    // More involved example where controller is required from an external file
    .controller('SupplierCtrl', ['$scope',
        '$injector',
        '$modal',
        '$routeParams',
        function($scope, $injector, $modal, $routeParams) {
            require([
                'controllers/master/supplier/supplierCtrl',
                'models/master/supplier'
            ], function(controller, Supplier) {
                // injector method takes an array of modules as the first argument
                // if you want your controller to be able to use components from
                // any of your other modules, make sure you include it together with 'ng'
                // Furthermore we need to pass on the $scope as it's unique to this controller
                $injector.invoke(controller, this, {
                    '$scope': $scope,
                    '$modal': $modal,
                    '$routeParams': $routeParams,
                    'Supplier': Supplier
                });
            });
        }
    ])
    .controller('SupplierDetailCtrl',[
        '$scope',
        '$injector',
        '$timeout',
        '$location',
        function($scope, $injector, $timeout, $location){
            require([
                'controllers/master/supplier/supplierDetailCtrl'
            ], function(controller){
                $injector.invoke(controller, this, {
                    '$scope': $scope,
                    '$timeout': $timeout,
                    '$location': $location
                });
            });
        }
    ])
    // ModalInstanceCtrl
    .controller('ModalInstanceCtrl', [
        '$scope',
        '$injector',
        '$modalInstance',
        function($scope, $injector, $modalInstance) {
            require([
                'controllers/master/supplier/dlg',
            ], function(controller) {
                $injector.invoke(controller, this, {
                    '$scope': $scope,
                    '$modalInstance': $modalInstance
                });
            });
        }
    ])
    //controller for adding supplier contact        
    .controller('SupplierAddContactCtrl', [
        '$injector',
        '$scope',
        '$routeParams',
        '$timeout',
        function($injector, $scope, $routeParams, $timeout) {
            require([
                'controllers/master/supplier/supplierAddContact',
                'models/master/contact'
                ], function(controller, Contact) {
                $injector.invoke(controller, this, {
                    '$scope': $scope,
                    '$routeParams': $routeParams,
                    'Contact': Contact,
                    '$timeout': $timeout
                });
            });
        }
    ])
    //controller for adding supplier site        
    .controller('SupplierAddSiteCtrl', [
        '$injector',
        '$scope',
        '$routeParams',
        'RegionService',
        '$timeout',
        '$q',
        function($injector, $scope, $routeParams, RegionService, $timeout, $q) {
            require([
                'controllers/master/supplier/supplierAddSite',
                'models/master/site'
                ], function(controller, Site) {
                $injector.invoke(controller, this, {
                    '$scope': $scope,
                    '$routeParams': $routeParams,
                    'RegionService': RegionService,
                    '$timeout': $timeout,
                    'Site': Site,
                    '$q': $q
                });
            });
        }
    ])
    //controller for listing supplier material        
    .controller('SupplierMaterialCtrl', [
        '$injector',
        '$scope',
        '$routeParams',
        function($injector, $scope, $routeParams) {
            require(['controllers/master/supplier/supplierMaterial'], function(controller) {
                $injector.invoke(controller, this, {
                    '$scope': $scope,
                    '$routeParams': $routeParams
                });
            });
        }
    ])
    //controller for adding supplier material        
    .controller('SupplierAddMaterialCtrl', [
        '$injector',
        '$scope',
        '$routeParams',
        function($injector, $scope, $routeParams) {
            require(['controllers/master/supplier/supplierAddMaterial'], function(controller) {
                $injector.invoke(controller, this, {
                    '$scope': $scope,
                    '$routeParams': $routeParams
                });
            });
        }
    ])

    .controller('PositionCtrl', ['$scope',
        '$injector',
        '$timeout',
        'OrganizationStructureService',
        function($scope, $injector,$timeout,OrganizationStructureService) {
            require(['controllers/master/position/position'], function(controller) {
                $injector.invoke(controller, this, {
                    '$scope': $scope,
                    '$timeout': $timeout,
                    'OrganizationStructureService': OrganizationStructureService
                });
            });
        }
    ])
    .controller("organizationController", ['$scope',
        '$injector',
        '$modal',
        '$modalInstance',
        '$routeParams',
        'organization',
        'id',
        function($scope, $injector, $modal, $modalInstance, $routeParams, organization, id) {
            require(['controllers/master/organization/organization'], function(controller) {
                // injector method takes an array of modules as the first argument
                // if you want your controller to be able to use components from
                // any of your other modules, make sure you include it together with 'ng'
                // Furthermore we need to pass on the $scope as it's unique to this controller
                $injector.invoke(controller, this, {
                    '$scope': $scope,
                    '$modal': $modal,
                    '$routeParams': $routeParams,
                    '$modalInstance': $modalInstance,
                    'organization': organization,
                    'id': id
                });
            });

        }
    ])
    .controller("organizationStructureCtrl", ['$scope',
        '$injector',
        '$modal',
        '$routeParams',
        function($scope, $injector, $modal, $routeParams) {
            require(['controllers/master/organization/organizationStructure'], function(controller) {
                // injector method takes an array of modules as the first argument
                // if you want your controller to be able to use components from
                // any of your other modules, make sure you include it together with 'ng'
                // Furthermore we need to pass on the $scope as it's unique to this controller
                $injector.invoke(controller, this, {
                    '$scope': $scope,
                    '$modal': $modal,
                    '$routeParams': $routeParams
                });
            });
        }
    ])
    .controller("userController",['$scope','$injector','$modal','$routeParams',
        function($scope,$injector,$modal,$routeParams){
            require(['controllers/master/user/userCtrl'],function(controller){
                $injector.invoke(controller,this,{
                    '$scope': $scope,
                    '$modal': $modal,
                    '$routeParams':$routeParams
                });
            });
        }
    ])
    .controller("userAddCtrl",['$scope','$injector','$modal','$routeParams',
        function($scope,$injector,$modal,$routeParams){
            require(['controllers/master/user/addUserCtrl'],function(controller){
                $injector.invoke(controller,this,{
                    '$scope': $scope,
                    '$modal': $modal,
                    '$routeParams':$routeParams
                });
            });
        }
    ])
    .controller("roleCtrl",['$scope','$injector','$modal','$routeParams',
        function($scope,$injector,$modal,$routeParams){
            require(['controllers/master/role/roleCtrl'],function(controller){
                $injector.invoke(controller,this,{
                    '$scope': $scope,
                    '$modal': $modal,
                    '$routeParams':$routeParams
                });
            });
        }
    ])
    .controller("roleAddCtrl",['$scope','$injector','$modal','$routeParams',
        function($scope,$injector,$modal,$routeParams){
            require(['controllers/master/role/addRoleCtrl'],function(controller){
                $injector.invoke(controller,this,{
                    '$scope': $scope,
                    '$modal': $modal,
                    '$routeParams':$routeParams
                });
            });
        }
    ])
     .controller("permissionGroupCtrl",['$scope','$injector','$modal','$routeParams',
        function($scope,$injector,$modal,$routeParams){
            require(['controllers/master/permission/groupCtrl'],function(controller){
                $injector.invoke(controller,this,{
                    '$scope': $scope,
                    '$modal': $modal,
                    '$routeParams':$routeParams
                });
            });
        }
    ])
    .controller("permissionGroupAddCtrl",['$scope','$injector','$modal','$routeParams',
        function($scope,$injector,$modal,$routeParams){
            require(['controllers/master/permission/addGroupCtrl'],function(controller){
                $injector.invoke(controller,this,{
                    '$scope': $scope,
                    '$modal': $modal,
                    '$routeParams':$routeParams
                });
            });
        }
    ])
    ;
});