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
        function($scope, $routeParams, $location, CommandService, RegionService, $timeout) {
            $scope.command = CommandService.getCommand();
            var command = $scope.command;
            if (command && command.receiver === 'SupplierAddSiteCtrl') {
                $scope.site = {};
                if (command.action === 'EditSite') {
                    $scope.originalSite = command.result;
                    angular.extend($scope.site, command.result);
                }
            }

            $scope.save = function() {
                CommandService.setCommand({
                    receiver: 'SupplierCtrl',
                    sender: 'SupplierAddSiteCtrl',
                    action: $scope.command.action,
                    result: $scope.site
                });
                if ($scope.command.action === 'EditSite') {
                    angular.extend($scope.originalSite, $scope.site);
                }
                $location.path('/supplier/create');
            };

            $scope.cancel = function() {
                CommandService.setCommand({
                    receiver: 'SupplierCtrl',
                    action: 'CancelAddorEditContact'
                });
                $location.path('/supplier/create');
            };

            $scope.areaChange = function() {

            };
            $scope.addContact = function(){
                $scope.$data.contacts.push({});
            };
            $scope.removeContact = function(index){
                if(index>=0){
                    $scope.$data.contacts.splice(index,1);
                }
            };
            $scope.init = function() {
                $scope.$data = {};
                $scope.$data.contacts = [{}];
                $timeout(function() {
                    $scope.$apply();
                });
            };
            $scope.init();
        }];
});