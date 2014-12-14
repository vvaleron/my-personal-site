define([
	'angular'
], 
function (angular) {
	'use strict';

	var authorization = angular.module('app.authorization', [
	  // 'ngRoute'
	]).
	config(function($routeProvider) {
	  $routeProvider.when('/authorization', {
	    templateUrl: 'templates/authorization.html'
	  });
	});

	return authorization;
});