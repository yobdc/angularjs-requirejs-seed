define([], function() {
	return [
		'$scope',
		'$timeout',
		'$modal',
		'$log',
		'$routeParams',
		'Supplier',
		'$q',
		'CommonService',
		function($scope, $timeout, $modal, $log, $routeParams, Supplier, $q, CommonService) {
			$scope.accountingInfo = {
				ledgerCatalog: '',
				creditInfo: '',
				accountDate: null,
				paymentType: '',
				defaultCurrency: '',
				paymentTerms: '',
				settlementType: '',
				accountAlert: '',
				paymentTo: '',
				isCustomer: false
			};

			$scope.accountDateOpen = function() {
				$timeout(function() {
					$scope.accountDateOpenFlag = true;
				});
			}

			$scope.ledgerCatalogs = [{
				name: 'bbc'
			}, {
				name: 'aaa'
			}, {
				name: 'abc'
			}, {
				name: 'ccc'
			}];
			$scope.autoLedgerCatalog = function(term) {
				var aaa = CommonService.getAutoData($scope.ledgerCatalogs, term, 'name');
				return CommonService.getAutoData($scope.ledgerCatalogs, term, 'name');
			}

			$scope.init = function() {
				$scope.$data = {};
				$scope.$data.supplier = new Supplier();
				$scope.$data.supplier.load().then(function(value) {
					$timeout(function() {
						$scope.$apply();
					});
				})
			};
			$scope.validateCompanyName = function(name) {
				$q.when($scope.$data.supplier.validateCompanyName(name)).then(function(result) {});
			};
			$scope.addContactPoint = function() {
				$scope.$data.supplier.addContactPoint();
			};
			$scope.removeContactPoint = function(index) {
				$scope.$data.supplier.removeContactPoint(index);
			};
			$scope.save = function() {
				try {
					$scope.$data.supplier.validate();
				} catch (ex) {
					$log.warn(ex);
				}
			};
			$scope.cancel = function() {};
			$scope.init();
		}];
});