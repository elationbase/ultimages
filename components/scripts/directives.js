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

    userDirectives.directive( "selectBox",
      function() {
        return({
          link: link,
          restrict: "A",
          template: '<li><span>by</span>name<span class="icon-menu"></span><ul><li><a>ascending</a></li><li><a>descending<a></li></ul></li>'
        });
        function link( scope, element, attributes ) {
          $(element).on("click", function handleClickEvent( event ) {
            event.preventDefault();
            $(this).fadeOut();
          });
        }
      }
    );

})(window.angular);
