/*
 *  Author: Frank Feng
 *  Description: controller for add and edit supplier site
 *
 */

define([], function() {
    return [
        '$scope',
        '$routeParams',
        '$location',
        'CommandService',
        'RegionService',
        '$timeout',
        'Site',
        '$q',
        function($scope, $routeParams, $location, CommandService, RegionService, $timeout, Site, $q) {
            $scope.save = function() {
                try {
                    var site = $scope.$data.site;
                    site.validate();
                    site.toRegionString();

                    CommandService.setCommand({
                        receiver: 'SupplierCtrl',
                        sender: 'SupplierAddSiteCtrl',
                        action: $scope.command.action,
                        result: site
                    });
                    if ($scope.command.action === 'EditSite') {
                        angular.extend($scope.originalSite, site);
                    }
                    $location.path('/supplier/create');
                } catch (ex) {
                    console.warn(ex);
                }
            };
            $scope.cancel = function() {
                CommandService.setCommand({
                    receiver: 'SupplierCtrl',
                    action: 'CancelAddorEditSite'
                });
                $location.path('/supplier/create');
            };
            $scope.addContact = function() {
                $scope.$data.site.addContact();
            };
            $scope.removeContact = function(index) {
                $scope.$data.site.removeContact(index);
            };
            $scope.addAddress = function() {
                $scope.$data.site.addAddress();
            };
            $scope.removeAddress = function(index) {
                $scope.$data.site.removeAddress(index);
            };
            $scope.autoContact = function(term) {
                var q = $q.defer();
                $timeout(function() {
                    var contacts = $scope.command.result.contacts;
                    if (term === '.') {
                        q.resolve(contacts);
                    } else {
                        var result = [];
                        for (var i = 0; i < contacts.length; i++) {
                            var c = contacts[i];
                            if (c && c.toFullname().indexOf(term) !== -1) {
                                result.push(c);
                            }
                        }
                        q.resolve(result);
                    }
                });
                return q.promise;
            };
            $scope.edit = function() {
                CommandService.setCommand({
                    receiver: 'SupplierAddSiteCtrl',
                    sender: 'SupplierAddSiteCtrl',
                    action: 'EditSite',
                    result: $scope.command.result
                });
                $location.path('/supplier/create/addOrEditSite');
            };
            $scope.init = function() {
                $scope.$data = {};
                $scope.command = CommandService.getCommand();
                var command = $scope.command;
                if (command && command.receiver === 'SupplierAddSiteCtrl') {
                    $scope.$data.site = new Site();
                    switch (command.action) {
                        case 'EditSite':
                            $scope.originalSite = command.result.site;
                            angular.extend($scope.$data.site, command.result.site);
                            break;
                        case 'ViewSite':
                            $scope.originalSite = command.result.site;
                            angular.extend($scope.$data.site, command.result.site);
                            break;
                        case 'AddSite':
                            $scope.$data.site.load().then(function(value) {
                                $timeout(function() {
                                    $scope.$apply();
                                });
                            });
                    }
                } else {
                    $location.path('/');
                    $scope.$apply();
                }
            };
            $scope.init();
        }];
});