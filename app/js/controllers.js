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
            })
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
        function($injector, $scope, $routeParams) {
            require(['controllers/master/supplier/supplierAddContact'], function(controller) {
                $injector.invoke(controller, this, {
                    '$scope': $scope,
                    '$routeParams': $routeParams,
                });
            });
        }
    ])
    //controller for adding supplier site        
    .controller('SupplierAddSiteCtrl', [
        '$injector',
        '$scope',
        '$routeParams',
        function($injector, $scope, $routeParams) {
            require(['controllers/master/supplier/supplierAddSite'], function(controller) {
                $injector.invoke(controller, this, {
                    '$scope': $scope,
                    '$routeParams': $routeParams,
                });
            });
        }
    ])
    .controller('PositionCtrl', ['$scope',
        '$injector',
        '$modal',
        '$routeParams',

        function($scope, $injector, $modal, $routeParams) {
            require(['controllers/master/position/position'], function(controller) {
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
    ]);
});