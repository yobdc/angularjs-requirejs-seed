/*
 *  Author: Frank Feng
 *  Description: controller for supplier detail
 *  
 */
define([], function() {
    return ['$scope', '$timeout', '$location', 'SupplierService', 'CommandService',
        function($scope, $timeout, $location, SupplierService, CommandService) {
            $scope.init = function() {
                $scope.$data = {};
                $scope.command = CommandService.getCommand();
                var command = $scope.command;
                if (command && command.receiver === 'SupplierDetailCtrl') {
                    if (command.action === 'SupplierDetail') {
                        $scope.supplierList = command.result.list;
                        $scope.index = command.result.index;
                        SupplierService.getByGuid({
                            guid: $scope.supplierList[$scope.index].guid
                        }, function(response) {
                            $scope.$data.supplier = response.data;
                        });
                    }
                }
            };
            $scope.init();

            $scope.editSupplier = function() {
                CommandService.setCommand({
                    receiver: 'SupplierCtrl',
                    sender: 'SupplierDetailCtrl',
                    action: 'EditSupplier',
                    result: $scope.$data.supplier
                });
                $location.path('/supplier/edit/'+$scope.$data.supplier.guid);
            };

            $scope.goToMaterial = function(id) {
                $location.path('/supplier/material/list');
            };
        }];
});
