/*
 *  Author: Frank Feng
 *  Description: controller for supplier material
 *  
 */

define([], function() {
    return ['$scope', '$routeParams', '$location', 'CommandService',
        function($scope, $routeParams, $location, CommandService) {
            $scope.materials = [{
                    name: 'm1',
                    code: 'm001'
                },
                {
                    name: 'm2',
                    code: 'm002'
                }];
            $scope.$apply();
            
            $scope.editMaterial = function(contact) {
                if (contact) {
                    CommandService.setCommand({
                        receiver: 'SupplierAddMaterialCtrl',
                        sender: 'SupplierMaterialCtrl',
                        action: 'EditMaterial',
                        result: material
                    });
                    $location.path('/supplier/material/addOrEdit');
                }
            };
            $scope.addMaterial = function() {
                CommandService.setCommand({
                    receiver: 'SupplierAddMaterialCtrl',
                    sender: 'SupplierMaterialCtrl',
                    action: 'AddMaterial'
                });
                $location.path('/supplier/material/addOrEdit');
            };
        }];
});