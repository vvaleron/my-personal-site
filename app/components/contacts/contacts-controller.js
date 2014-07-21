appContainer.
  controller('contacts-controller', ['$scope', function($scope) {
    		console.log("contacts-controller", this);
    		$scope.page = "contacts";
    }])

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