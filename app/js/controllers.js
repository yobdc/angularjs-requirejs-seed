define(['angular', 'services','jquery','angularBootstrap'], function (angular) {
	'use strict';

	/* Controllers */
	
	return angular.module('myApp.controllers', ['myApp.services', 'ui.bootstrap'])
		// More involved example where controller is required from an external file
		.controller('SupplierCtrl', ['$scope',
			'$injector',
			'$modal',
			'$routeParams',
			function($scope, $injector, $modal, $routeParams) {
				require([
                    'controllers/master/supplier/supplier',
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
			}])
		// ModalInstanceCtrl
		.controller('ModalInstanceCtrl', [
			'$scope',
			'$injector',
			'$modalInstance',
			'items',
			function($scope, $injector, $modalInstance, items) {
				require([
                    'controllers/master/supplier/dlg',
                ], function(controller) {
					$injector.invoke(controller, this, {
						'$scope': $scope,
						'$modalInstance': $modalInstance,
						'items': items
					});
				});
			}]);
});