define([], function() {
	return [
		'$scope',
		'$timeout',
		'$location',
		function($scope, $timeout, $location) {
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
					$scope.$data.supplier = $scope.$data.supplierList[index];
					$scope.$data.collapsed = false;
				}
			};
			$scope.search = function(keyword){};
			$scope.addSupplier = function(){
				$location.path('/supplier/create');
			};
			$scope.init = function() {
				$scope.$data = {}
				$scope.$data.supplier = null;
				$scope.$data.supplierList = [];
				$scope.$data.collapsed = true;

				for(var i=0;i<6;i++){
					$scope.$data.supplierList.push({name:'李三三',id:'ID12345',company:'上海贝斯有限公司',phone:'15475544716'});
				}

				$timeout(function() {
					$scope.$apply();
				});
			};
			$scope.init();
		}];
});