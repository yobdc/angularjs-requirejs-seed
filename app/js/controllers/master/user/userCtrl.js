/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
define([], function() {
return ['$scope', '$location',
    function($scope,$location){
         $scope.title="用户管理";
        $scope.$data={};
        $scope.$data.collapsed = true;
        $scope.collapse = function() {
            $scope.$data.collapsed = !$scope.$data.collapsed;
        };
        $scope.$data.user = null;
        $scope.addUser = function(){
            $location.path('/user/create');
        };
    }
];
});
