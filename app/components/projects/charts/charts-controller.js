appContainer.
  controller('charts-controller', ['$scope', '$filter', function($scope, $filter) {
    		console.log("charts-controller", this);
        var game = $(".charts > .wrapper")[0];
            
        $scope.temperature = 27;
        $scope.date = $filter('date')(new Date(), 'yyyy-MM-dd');
        $scope.time = $filter('date')(new Date(), 'HH:mm');

    }]);

  // appContainer.
  // directive('appContainer', [/*'version',*/ function(/*version*/) {
	 //    return {
	 //    	templateUrl:'components/app-container/appContainer.html'
	 //    }
  // }]);

  // app.
  //   filter('interpolate', ['version', function(version) {
  //   return function(text) {
  //     return String(text).replace(/\%VERSION\%/mg, version);
  //   };
  // }]);