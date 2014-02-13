/*
 *  Author: Frank Feng
 *  Description: controller for add and edit supplier contact
 *
 */

define([], function() {
    return ['$scope', '$routeParams', '$location', 'CommandService',
        function($scope, $routeParams, $location, CommandService) {
            $scope.command = CommandService.getCommand();
            var command = $scope.command;
            if (command && command.receiver === 'SupplierAddContactCtrl') {
                $scope.contact = {};
                if (command.action === 'EditContact') {
                    $scope.originalContact = command.result;
                    angular.extend($scope.contact, command.result);
                }

            }
            $scope.save = function() {
                CommandService.setCommand({
                    receiver: 'SupplierCtrl',
                    sender: 'SupplierAddContactCtrl',
                    action: $scope.command.action,
                    result: $scope.contact
                });
                if($scope.command.action==='EditContact'){
                    angular.extend($scope.originalContact, $scope.contact);
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