(function(angular) {
  'use strict';
  var myApp = angular.module('myApp', [
    'ngRoute',
    'ngAnimate',
    'userControllers',
    'userDirectives'
  ]);

  myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'views/list.html',
      controller: 'ListController'
    })
    .when('/user/:itemId', {
      templateUrl: 'views/user.html',
      controller: 'UserController'
    })
    .otherwise({
      redirectTo: '/'
    });
  }]);

})(window.angular);
