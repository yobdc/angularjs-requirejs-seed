/*
 *  Author: Frank Feng
 *  Description: controller for supplier material
 *  
 */

define([], function() {
    return ['$scope', '$routeParams', '$location',
        function($scope, $routeParams, $location) {
//            $scope.materials = [{
//                    id: 1
//                },
//                {
//                    id: 2
//                }];
            $scope.addMaterial = function() {
                $location.path('/supplier/material/addOrEdit');
            };
            
        }];
});