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
            
        $scope.slides = [{
            name:'1',
            icon:"fa fa-4x fa-circle-o"
        },{
            name:'2',
            icon:"fa fa-4x fa-cloud-upload"
        },{
            name:'3',
            icon:"fa fa-4x fa-camera-retro"
        },{
            name:'4',
            icon:"fa fa-4x fa-anchor"
        }];
                        
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
        $scope.currentIndex = 2;
        $scope.slideLeft = function(){
            $scope.currentIndex=($scope.currentIndex+1)%4;
        }
        $scope.slideRight = function(){
            $scope.currentIndex=($scope.currentIndex-1)%4;
        }
            
        $scope.accountDateOpen = function() {
            $timeout(function() {
                $scope.accountDateOpenFlag = true;
            });
        }
        $scope.autoLedgerCatalog = function(term) {
            var aaa = CommonService.getAutoData($scope.ledgerCatalogs, term, 'name');
            return CommonService.getAutoData($scope.ledgerCatalogs, term, 'name');
        }
        $scope.autoBelongto = function(term) {
            var q = $q.defer();
            var query = (term !== '.') ? '' : term;
            $scope.$data.supplier.search(query).then(function(data) {
                q.resolve(data);
            });
            return q.promise;
        };

        $scope.init = function() {
            $scope.command = CommandService.getCommand();
            var command = $scope.command;
            if (command && (command.receiver === 'SupplierCtrl' || command.sender === 'SupplierCtrl')) {
                if (CommandService.get('SupplierCtrl')) {
                    $scope.$data = CommandService.get('SupplierCtrl');
                    switch (command.action) {
                        case 'EditSupplier':
                            $scope.$data.supplier = command.result;
                            break;
                        case 'AddContact':
                            $scope.$data.supplier.contacts.push(command.result);
                            $scope.$data.supplier.setPrimaryContact(command.result);
                            break;
                        case 'EditContact':
                            $scope.$data.supplier.setPrimaryContact(command.result);
                            break;
                        case 'AddSite':
                            $scope.$data.supplier.sites.push(command.result);
                            $scope.$data.supplier.setPrimarySite(command.result);
                            break;
                        case 'EditSite':
                            $scope.$data.supplier.setPrimarySite(command.result);
                            break;
                    }
                    $scope.$data.supplier.clearEmptySite();
                    $scope.$data.supplier.clearEmptyContact();
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
        $scope.viewContact = function(contact) {
            if (contact) {
                CommandService.setCommand({
                    receiver: 'SupplierAddContactCtrl',
                    sender: 'SupplierCtrl',
                    action: 'ViewContact',
                    result: contact
                });
                $location.path('/supplier/contact');
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
        $scope.viewSite = function(site) {
            if (site) {
                CommandService.setCommand({
                    receiver: 'SupplierAddSiteCtrl',
                    sender: 'SupplierCtrl',
                    action: 'ViewSite',
                    result: {
                        site: site,
                        contacts: $scope.$data.supplier.contacts
                    }
                });
                $location.path('/supplier/site');
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
