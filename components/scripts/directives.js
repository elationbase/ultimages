(function(angular) {
  'use strict';
  var userDirectives = angular.module('userDirectives', [])

  userDirectives.directive("testDirective", function() {
    return {
      template : "<h1>test directive</h1>"
    };
  });

    userDirectives.directive("jsDirective", function() {
      return {
        template : "<h1>test directive</h1>",
        restrict: 'A',
        scope: true,
        link: function(tElement, tAttributes) {
          alert('hello')
        }
      };
    });


})(window.angular);
