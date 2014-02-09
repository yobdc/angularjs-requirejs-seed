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
		'CommandService',
		'$location',
		function($scope, $timeout, $modal, $log, $routeParams, Supplier, $q, CommonService, CommandService, $location) {
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
				$scope.command = CommandService.getCommand();
				var command = $scope.command;
				if (command && (command.receiver === 'SupplierCtrl' || command.sender === 'SupplierCtrl')) {
					if (CommandService.get('SupplierCtrl')) {
						$scope.$data = CommandService.get('SupplierCtrl');
						if (command.action === 'AddContact') {
							$scope.$data.supplier.contacts = $scope.$data.supplier.contacts || [];
							$scope.$data.supplier.contacts.push(command.result);
						} else if (command.action === 'EditContact') {}
					}
				} else {
					$scope.$data = {};
					CommandService.set('SupplierCtrl', $scope.$data);
					$scope.$data.supplier = new Supplier();
					$scope.$data.supplier.load().then(function(value) {
						$timeout(function() {
							$scope.$apply();
						});
					});
				}
				// CommandService.setCommand();
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
			$scope.editContact = function(contact) {
				if (contact) {
					CommandService.setCommand({
						receiver: 'SupplierAddContactCtrl',
						sender: 'SupplierCtrl',
						action: 'EditContact',
						result: contact
					});
					$location.path('/supplier/create/addOrEditContact');
				}
			};
			$scope.addContact = function() {
				CommandService.setCommand({
					receiver: 'SupplierAddContactCtrl',
					sender: 'SupplierCtrl',
					action: 'AddContact'
				});
				// $scope.go('/supplier/create/addOrEditContact')
				$location.path('/supplier/create/addOrEditContact');
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