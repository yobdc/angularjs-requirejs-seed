define([], function() {
	return ['$scope', '$timeout', '$modal', '$log', function($scope, $timeout, $modal, $log) {
		// You can access the scope of the controller from here
		$scope.welcomeMessage = 'zzzzzzz!';

		// because this has happened asynchroneusly we've missed
		// Angular's initial call to $apply after the controller has been loaded
		// hence we need to explicityly call it at the end of our Controller constructor
		$timeout(function() {
			$scope.$apply();			
		});
		$scope.open = function () {
		    var modalInstance = $modal.open({
		      templateUrl: 'myModalContent.html',
		      controller: 'ModalInstanceCtrl',
		      resolve: {
		        items: function () {
		          return ['aaa','bbb','ccc'];
		        }
		      }
		    });

		    modalInstance.result.then(function (selectedItem) {
		      $scope.selected = selectedItem;
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		};
	}];
});