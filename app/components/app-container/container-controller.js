appContainer.
controller('container-controller', ['$scope', function($scope) {
  		console.log("app-container-controller", this);
  		$scope.game = ["Home", "About", "Contacts", "Projects"];
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