/**
 * Created by Jimson on 14-2-17.
 */
define([], function() {
    return ['$scope',
        function($scope){
            $scope.title="用户管理";
            $scope.$data={};
            $scope.$data.collapsed = true;
            $scope.collapse = function() {
                $scope.$data.collapsed = !$scope.$data.collapsed;
            };
            $scope.$data.user = null;
        }
    ];
});
