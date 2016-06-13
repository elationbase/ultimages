(function(angular) {
  'use strict';
  var userControllers = angular.module('userControllers', ['ngAnimate'])

  .controller('ListController', ['$scope', '$http', function($scope, $http) {
    $http.get('/js/data.json').success(function(data) {
      $scope.users = data;
      $scope.userOrder = 'name';
    });
  }])

  .controller('UserController', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
    $http.get('js/data.json').success(function(data) {
      $scope.users = data;
      $scope.whichItem = $routeParams.itemId;
    });
  }])

})(window.angular);
