var appContainer = angular.module('container', [
  'ngRoute'
  // 'container-controller_test',
//  'app.directives',
  // 'app.controllers'
]).

config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', { 
    	controller: 'container-controller'}
    	);
    // .

    $routeProvider.when('/about', {
    	templateUrl: 'components/about/aboutContent.html', 
    	controller: 'about-controller'}
    	);

    $routeProvider.when('/contacts', {
        templateUrl: 'components/contacts/contactsContent.html', 
        controller: 'contacts-controller'}
        );

    $routeProvider.when('/home', {
        templateUrl: 'components/home/homeContent.html', 
        controller: 'home-controller'}
        );

    $routeProvider.when('/projects', {
        templateUrl: 'components/projects/projectsContent.html', 
        controller: 'projects-controller'}
        );

        $routeProvider.when('/projects/blocks', {
            templateUrl: 'components/projects/blocks/blocksContent.html', 
            controller: 'blocks-controller'}
        );

        $routeProvider.when('/projects/tetris', {
            templateUrl: 'components/projects/tetris/tetrisContent.html', 
            controller: 'tetris-controller'}
        );

    // otherwise({
    //     redirectTo: '/'
    //   });
    // $routeProvider.when('/', {
    // 	templateUrl: 'components/app-container/appContainer.html', 
    // 	controller: 'container-controller'}
    // 	);
    // $routeProvider.when('/view2', {templateUrl: '../html/partial2.html', controller: 'MyCtrl2'});
}]);