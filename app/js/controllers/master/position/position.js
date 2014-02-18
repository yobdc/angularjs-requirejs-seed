define([], function() {
    return [
    '$scope',
    '$timeout',
    'OrganizationStructureService',
    function($scope, $timeout,OrganizationStructureService) {
                    
        $scope.init = function() {
            $scope.$data = {}
            $scope.$data.supplier = null;
            $scope.$data.supplierList = [];
            $scope.$data.collapsed = true;
                                
            OrganizationStructureService.getPrimaryStructure(function(data){
                $scope.priStr = data.value;
                $scope.osrChildren = $scope.priStr.root.children;
            });
                                

            for(var i=0;i<6;i++){
                $scope.$data.supplierList.push({
                    name:'李三三',
                    id:'ID12345',
                    company:'上海贝斯有限公司',
                    phone:'15475544716'
                });
            }

            $timeout(function() {
                $scope.$apply();
            });
        };
        $scope.init();
    }];
});