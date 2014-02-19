define([], function() {
    return ['$scope', '$timeout', '$location', 'SupplierService', 'CommandService',
        function($scope, $timeout, $location, SupplierService, CommandService) {
            $scope.swtichView = function() {
                if ($location.$$path.indexOf('board') !== -1) {
                    $location.path('/supplier/list');
                } else {
                    $location.path('/supplier/board');
                }
            };
            $scope.collapse = function() {
                $scope.$data.collapsed = !$scope.$data.collapsed;
            };
            $scope.select = function(index) {
                if ($scope.$data.supplier !== $scope.$data.supplierList[index]) {
                    var guid = $scope.$data.supplierList[index].guid;
                    SupplierService.getByGuid({
                        guid: guid
                    }, function(response) {
                        $scope.$data.supplier = response.data;
                        $scope.$data.collapsed = false;
                    });
                }
            };
            $scope.goToDetail = function(index) {
                CommandService.setCommand({
                    receiver: 'SupplierDetailCtrl',
                    sender: 'SupplierListCtrl',
                    action: 'SupplierDetail',
                    result: {
                        list: $scope.$data.supplierList,
                        index: index
                    }
                });
                $location.path('/supplier/detail');
            }
            $scope.search = function(keyword) {
                SupplierService.query({
                    keyword: keyword
                }, function(response) {
                    $scope.$data.supplierList = response.data;
                    $scope.$data.supplier = null;
                    $scope.$data.collapsed = true;
                });
            };
            $scope.addSupplier = function() {
                $location.path('/supplier/create');
            };
            $scope.editSupplier = function() {
                CommandService.setCommand({
                    receiver: 'SupplierCtrl',
                    sender: 'SupplierListCtrl',
                    action: 'EditSupplier',
                    result: $scope.$data.supplier
                });
                $location.path('/supplier/edit/'+$scope.$data.supplier.guid);
            }
            $scope.goToMaterial = function(id) {
                $location.path('/supplier/material/list');
            };
            $scope.init = function() {
                $scope.$data = {}
                CommandService.set('SupplierCtrl', $scope.$data);
                $scope.$data.supplier = null;
                $scope.$data.supplierList = [];
                $scope.$data.collapsed = true;
                $scope.$data.listView = true;
                
                SupplierService.list(function(response) {
                    $scope.$data.supplierList = response.data;
                });

                $timeout(function() {
                    $scope.$apply();
                });
            };
            $scope.init();
        }];
});