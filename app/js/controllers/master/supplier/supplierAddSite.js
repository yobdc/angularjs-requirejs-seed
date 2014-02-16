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
        function($scope, $routeParams, $location, CommandService, RegionService, $timeout, Site) {
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
            $scope.init = function() {
                $scope.$data = {};
                $scope.command = CommandService.getCommand();
                var command = $scope.command;
                if (command && command.receiver === 'SupplierAddSiteCtrl') {
                    $scope.$data.site = new Site();
                    if (command.action === 'EditSite') {
                        $scope.originalSite = command.result;
                        angular.extend($scope.$data.site, command.result);
                    } else if (command.action === 'AddSite') {
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