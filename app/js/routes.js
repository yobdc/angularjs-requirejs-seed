define(['angular', 'app'], function(angular, app) {
	'use strict';

	return app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/suplier/create', {
			templateUrl: 'app/views/master/supplier/supplier.html',
			controller: 'SupplierCtrl'
		});
		$routeProvider.otherwise({redirectTo: '/suplier/create'});
	}]);
});