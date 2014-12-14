// 'use strict';
// var app = angular.module('app', [
//   'ngRoute',
//   'authorization'
// ]);

window.name = "NG_DEFER_BOOTSTRAP!";

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

    angular.element().ready(function() {
        angular.resumeBootstrap(['app']);
    });

	app.config(['$routeProvider', function($routeProvider) {
	    $routeProvider.when('/login', {
	    	templateUrl: 'templates/appContainer.html'
	    	}
	    );

	    // $routeProvider.when('/registration', {
	    //     templateUrl: 'components/login/registrationWindow.html', 
	    //     controller: 'registration-controller'}
	    // );

	    // $routeProvider.when('/my-profile', {
	    //     templateUrl: 'components/userProfile/userProfile.html',
	    //     controller: 'user-profile-controller'}
	    // );

	    // $routeProvider.when('/details-grid', {
	    //     templateUrl: 'components/detailsGrid/detailsGrid.html',
	    //     controller: 'details-grid-controller'}
	    // );
	}]);

    app.run(["$rootScope", '$http', function ($rootScope, $http) {
    	console.log("module 'app' is runed");
	}]);



    return app;
});