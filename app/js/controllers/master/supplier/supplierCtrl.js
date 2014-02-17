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
            $scope.accountDateOpen = function() {
                $timeout(function() {
                    $scope.accountDateOpenFlag = true;
                });
            }
            $scope.autoLedgerCatalog = function(term) {
                var aaa = CommonService.getAutoData($scope.ledgerCatalogs, term, 'name');
                return CommonService.getAutoData($scope.ledgerCatalogs, term, 'name');
            }
            $scope.zz = true;
            $scope.$watch(function(){
                return $scope.zz;
            }, function(newVal, oldVal){
                console.log(newVal);
            })

            $scope.init = function() {
                $scope.command = CommandService.getCommand();
                var command = $scope.command;
                if (command && (command.receiver === 'SupplierCtrl' || command.sender === 'SupplierCtrl')) {
                    if (CommandService.get('SupplierCtrl')) {
                        $scope.$data = CommandService.get('SupplierCtrl');
                        switch (command.action) {
                            case 'AddContact':
                                $scope.$data.supplier.contacts = $scope.$data.supplier.contacts || [];
                                $scope.$data.supplier.contacts.push(command.result);
                                $scope.$data.supplier.setPrimaryContact(command.result);
                                break;
                            case 'EditContact':
                                $scope.$data.supplier.setPrimaryContact(command.result);
                                break;
                            case 'AddSite':
                                $scope.$data.supplier.sites = $scope.$data.supplier.sites || [];
                                $scope.$data.supplier.sites.push(command.result);
                                $scope.$data.supplier.setPrimarySite(command.result);
                                break;
                            case 'EditSite':
                                $scope.$data.supplier.setPrimarySite(command.result);
                                break;
                        }
                        $timeout(function() {
                            $scope.$apply();
                        });
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

            //add and edit supplier contacts
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

            //add and edit supplier sites
            $scope.editSite = function(site) {
                if (site) {
                    CommandService.setCommand({
                        receiver: 'SupplierAddSiteCtrl',
                        sender: 'SupplierCtrl',
                        action: 'EditSite',
                        result: {
                            site: site,
                            contacts: $scope.$data.supplier.contacts
                        }
                    });
                    $location.path('/supplier/create/addOrEditSite');
                }
            };
            $scope.addSite = function() {
                CommandService.setCommand({
                    receiver: 'SupplierAddSiteCtrl',
                    sender: 'SupplierCtrl',
                    action: 'AddSite',
                    result: {
                        contacts: $scope.$data.supplier.contacts
                    }
                });
                $location.path('/supplier/create/addOrEditSite');
            };

            //go to material list of supplier
            $scope.goToMaterial = function(id) {
                $location.path('/supplier/material/list');
            };

            $scope.save = function() {
                try {
                    $scope.$data.supplier.validate();
                } catch (ex) {
                    $log.warn(ex);
                }
            };
            $scope.cancel = function() {
                $location.path('/supplier/list');
            };
            $scope.init();
        }];
});