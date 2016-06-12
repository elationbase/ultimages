var userControllers = angular.module('userControllers', ['ngAnimate']);

userControllers.controller('ListController', ['$scope', '$http', function($scope, $http) {
  $http.get('/js/data.json').success(function(data) {
    $scope.users = data;
    $scope.userOrder = 'name';
  });
}]);

userControllers.controller('DetailsController', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
  $http.get('js/data.json').success(function(data) {
    $scope.users = data;
    $scope.whichItem = $routeParams.itemId;
  });
}]);
