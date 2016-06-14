(function($, window, document) {
    "use strict";
    var winWidth, winHeight, modalWidth, modalHeight;
    var openModal;
    var cwModal = {
        launch: function (ele) {
            openModal = ele;
            $(ele).addClass('modal-active');
            setTimeout(function(){
                $(ele).addClass('modal-visible');
                cwModal.setPosition(ele);
            },10);
        },
        close: function (time) {
            $('.modal').removeClass('modal-visible');
            setTimeout(function(){
                $('.modal').removeClass('modal-active');
            }, time/2);
        },
        setPosition: function() {
            winWidth = $(window).width()/ 2;
            winHeight = $(window).height()/ 2;
            modalWidth = $(openModal + ' .modal-body').width()/ 2;
            modalHeight = $(openModal + ' .modal-body').height()/2;
            $(openModal + ' .modal-wrap').css('left', winWidth - modalWidth);
            $(openModal + ' .modal-content').css('maxHeight', (winHeight *2) - 100);
            if (modalHeight < winHeight) {
                $(openModal + ' .modal-wrap').css('top', winHeight - modalHeight);
            }
        }
    };

    $(document).ready(function(){

        // default transition time ms
        var time = 400;

        // Open Modal win with all tag elevents with the attribute "data-modal-target"
        $('body').on('click', '[data-modal-target]', function(event) {
            event.preventDefault();
            // Read the value of the attribute "data-modal-target"
            var target = '#' + $(this).data('modal-target');
            // Check class to set the speed of transition
            if ($(target).hasClass('modal-fast')) {
                time = 200
            } else if ($(target).hasClass('modal-slow')) {
                time = 600
            }
            // Open modal window object function
            cwModal.launch(target, time);
        });

        // Close Modal win with all elevents with .modal-close" and ".modal-mask" class
        $('body').on('click', '.modal-close, .modal-mask', function(event) {
            event.preventDefault();
            cwModal.close(time);
        });

        // Close Modal win with esc key.
        $(document).keydown(function(event) {
            // Check key is esc && check modal win is open && check if video is not in full screen mode
            if (event.keyCode == 27 && $('.modal').is(':visible') && window.innerHeight !== screen.height ) {
                // Close modal window object function
                cwModal.close(time);
            }
        });

        // If user size the window re-set modal position
        $(window).on('resize', function () {
            // Close modal window object function
            if ($('.modal').is(':visible')) {
                var visibleModal = $('.modal').is(':visible')[0];
                cwModal.setPosition(visibleModal);
            }
        });

    });

}(window.jQuery, window, document));
