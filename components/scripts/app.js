var myApp = angular.module('myApp', [
  'ngRoute',
  'usersControllers'
]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/list', {
    templateUrl: 'views/list.html',
    controller: 'ListController'
  }).
  when('/user/:itemId', {
    templateUrl: 'views/user.html',
    controller: 'UserController'
  }).
  otherwise({
    redirectTo: '/list'
  });
}]);
