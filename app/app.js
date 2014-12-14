// 'use strict';
// var app = angular.module('app', [
//   'ngRoute',
//   'authorization'
// ]);

define([
    'angular',
    'angularRoute',
    'authorization'
],
 
function (ng, angularRoute, authorization) {
    'use strict';

    var app = ng.module('app', [
        'ngRoute',
        'app.authorization'
    ]);

    // angular.element().ready(function() {
    //     angular.resumeBootstrap(['app']);
    // });

	app.config(['$routeProvider', function($routeProvider) {
	    $routeProvider.when('/', {
	    	templateUrl: 'templates/appContainer.html'
	    	}
	    );
	}]);

    app.run(["$rootScope", '$http', function ($rootScope, $http) {
    	console.log("module 'app' is runed");
	}]);



    return app;
});