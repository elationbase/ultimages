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

    userDirectives.directive( "modalDelete",
      function() {
        return({
          link: link,
          restrict: "A",
          templateUrl: 'views/user-directives/modal-delete.html'
        });
        function link( scope, element, attributes ) {
          element.on("click", '.button', function(event) {
            event.preventDefault();
            $('.modal').removeClass('modal-visible');
            setTimeout(function(){
                $('.modal').removeClass('modal-active');
            }, 500);
          });
        }
      }
    );

    userDirectives.directive( "modalImage",
      function() {
        return({
          link: link,
          restrict: "A",
          templateUrl: 'views/user-directives/modal-image.html'
        });
        function link( scope, element, attributes ) {
          var numRand = Math.floor(Math.random() * 20);
          $('#modal-image .modal-content').html('<img src="img/artist/' + numRand + '.jpg" alt="" />');
          $('main').on('click', '.file a', function(event, element) {
      			event.preventDefault();
            numRand = Math.floor(Math.random() * 20);
            $('#modal-image .modal-content').html('<img src="img/artist/' + numRand + '.jpg" alt="" />');
      		});

          element.on("click", '.button', function(event) {
            event.preventDefault();
            $('.modal').removeClass('modal-visible');
            setTimeout(function(){
                $('.modal').removeClass('modal-active');
            }, 500);
          });
        }
      }
    );



    userDirectives.directive( "modalAdd",
      function() {
        return({
          link: link,
          restrict: "A",
          templateUrl: 'views/user-directives/modal-add.html'
        });
        function link( scope, element, attributes ) {
          document.querySelector('.file-upload').addEventListener("change", function() {
            var self = this;
            var file = self.files[0];
            var reader = new FileReader();
            reader.onload = function() {
              var img = document.createElement('img');
              img.src = reader.result;
              self.parentNode.appendChild(img);
            };
            reader.readAsDataURL(file);
          }, false);
        }
      }
    );



        userDirectives.directive( "modalAddImproove",
          function() {
            return({
              link: link,
              restrict: "A",
              templateUrl: 'views/user-directives/modal-add2.html'
            });

            function link( scope, element, attributes ) {
              var holder = document.getElementById('holder'),
                  tests = {
                    filereader: typeof FileReader != 'undefined',
                    dnd: 'draggable' in document.createElement('span'),
                    formdata: !!window.FormData,
                    progress: "upload" in new XMLHttpRequest
                  },
                  support = {
                    filereader: document.getElementById('filereader'),
                    formdata: document.getElementById('formdata'),
                    progress: document.getElementById('progress')
                  },
                  acceptedTypes = {
                    'image/png': true,
                    'image/jpeg': true,
                    'image/gif': true
                  },
                  progress = document.getElementById('uploadprogress'),
                  fileupload = document.getElementById('upload');

              "filereader formdata progress".split(' ').forEach(function (api) {
                if (tests[api] === false) {
                  support[api].className = 'fail';
                } else {
                  // FFS. I could have done el.hidden = true, but IE doesn't support
                  // hidden, so I tried to create a polyfill that would extend the
                  // Element.prototype, but then IE10 doesn't even give me access
                  // to the Element object. Brilliant.
                  support[api].className = 'hidden';
                }
              });

              function previewfile(file) {
                if (tests.filereader === true && acceptedTypes[file.type] === true) {
                  var reader = new FileReader();
                  reader.onload = function (event) {
                    var image = new Image();
                    image.src = event.target.result;
                    image.width = 250; // a fake resize
                    holder.appendChild(image);
                  };

                  reader.readAsDataURL(file);
                }  else {
                  holder.innerHTML += '<p>Uploaded ' + file.name + ' ' + (file.size ? (file.size/1024|0) + 'K' : '');
                  console.log(file);
                }
              }

              function readfiles(files) {
                  debugger;
                  var formData = tests.formdata ? new FormData() : null;
                  for (var i = 0; i < files.length; i++) {
                    if (tests.formdata) formData.append('file', files[i]);
                    previewfile(files[i]);
                  }

                  // now post a new XHR request
                  if (tests.formdata) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', '/devnull.php');
                    xhr.onload = function() {
                      progress.value = progress.innerHTML = 100;
                    };

                    if (tests.progress) {
                      xhr.upload.onprogress = function (event) {
                        if (event.lengthComputable) {
                          var complete = (event.loaded / event.total * 100 | 0);
                          progress.value = progress.innerHTML = complete;
                        }
                      }
                    }

                    xhr.send(formData);
                  }
              }

              if (tests.dnd) {
                holder.ondragover = function () { this.className = 'hover'; return false; };
                holder.ondragend = function () { this.className = ''; return false; };
                holder.ondrop = function (e) {
                  this.className = '';
                  e.preventDefault();
                  readfiles(e.dataTransfer.files);
                }
              } else {
                fileupload.className = 'hidden';
                fileupload.querySelector('input').onchange = function () {
                  readfiles(this.files);
                };
              }
            }
        });

        userDirectives.directive( "slideshowBg",
          function() {
            return({
              link: link,
              restrict: "A",
              templateUrl: 'views/user-directives/slideshow-bg.html'
            });
            function link( scope, element, attributes ) {
              element.hide();
              var cycleImages = function() {
                var ele = element[0];
              	var $active = $(ele).find('.is-active');
              	var $first = $(ele).find('.bg-img:first');
              	var $next = ($active.next().length > 0) ? $active.next() : $first;
              	$next.css('z-index',2);//move the next image up the pile
              	$active.fadeOut(1000,function(){//fade out the top image
              		$active.css('z-index',1).show().removeClass('is-active');//reset the z-index and unhide the image
              		$next.css('z-index',3).addClass('is-active');//make the next image the top one
              	});
              }
              element.delay(6000).fadeIn(1000, function () {
                setInterval(cycleImages, 6000);
              });//fade the background back in once all the images are loaded
              // run every 5s


            }
          }
        );

})(window.angular);
