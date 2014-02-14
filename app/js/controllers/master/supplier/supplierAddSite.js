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
        function($scope, $routeParams, $location, CommandService, RegionService) {
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
        }];
});