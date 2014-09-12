(function(){
appContainer.
  controller('projects-controller', ['$scope','$routeParams', function($scope, $routeParams) {
    		console.log("projects-controller", this);
        $scope.progectId = $routeParams.progectId;
    		$scope.page = "projects";

        var projectItem = {
          img:'resourses/img/lorem-impsus.png',
          imgDescription: 'first game',
          title:'first game',
          description:'this is my first game. I\'ll start working on it as soon as posible.',
          links:[
            { gitHub: 'https://github.com/vvaleron/lorem-impsus' },
            { play: '#/play/first-game' }
          ]
        };

        $scope.projectItem = projectItem;
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
}());