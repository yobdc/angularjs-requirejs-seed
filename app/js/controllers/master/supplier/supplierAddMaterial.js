/*
 *  Author: Frank Feng
 *  Description: controller for adding supplier material
 *
 */

define([], function() {
    return ['$scope', '$routeParams', '$location',
        function($scope, $routeParams, $location) {
            $scope.save = function() {
                // CommandService.setCommand({
                //     receiver: 'SupplierCtrl',
                //     sender: 'SupplierAddContactCtrl',
                //     action: $scope.command.action,
                //     result: $scope.contact
                // });
                // if($scope.command.action==='EditContact'){
                //     angular.extend($scope.originalContact, $scope.contact);
                // }
                $location.path('/supplier/material/list');
            };

            $scope.cancel = function() {
                // CommandService.setCommand({
                //     receiver: 'SupplierCtrl',
                //     action: 'CancelAddorEditContact'
                // });
                $location.path('/supplier/material/list');
            };
        }];
});