appContainer.
  controller('tetris-controller', ['$scope', function($scope) {
    		console.log("tetris-controller", this);
        var game = $(".tetris > .wrapper")[0];


        $('.tetris .control button').on('click', function(){
            console.log(game)
            if (game.getContext) {
              var ctx = game.getContext('2d');
                  ctx.beginPath();

  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 2;
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
 
  ctx.font = "20px Times New Roman";
  ctx.fillStyle = "Black";
  ctx.fillText("Valeriy Shkolniy", 5, 30);






            }
        });
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