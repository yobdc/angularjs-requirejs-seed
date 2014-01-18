define([], function() {
	return ['$scope', '$timeout', function($scope, $timeout) {
		// You can access the scope of the controller from here
		$scope.welcomeMessage = 'zzzzzzz!';

		// because this has happened asynchroneusly we've missed
		// Angular's initial call to $apply after the controller has been loaded
		// hence we need to explicityly call it at the end of our Controller constructor
		$timeout(function() {
			$scope.$apply();			
		});
	}];
});