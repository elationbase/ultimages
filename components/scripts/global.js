// remap jQuery to $
(function($){

	/* trigger when page is ready */
	$(document).ready(function (){

		/*
			Stick elements
		*/
		var winTop = $(window).scrollTop();
		var stickClass = 'js-stick-on';
		var offset, pos;

		var addStick = function(offset) {

			winTop = $(window).scrollTop();

			$('.js-stick-ele').each(function() {

				offset = $(this).data('offset');
				pos = $(this).position().top - winTop;

				if (pos < offset) {
					if (!$(this).hasClass(stickClass)) {
						$(this).addClass(stickClass);
					}
				} else {
					if ($(this).hasClass(stickClass)) {
						$(this).removeClass(stickClass);
					}
				}
			});
		};

		$(window).on('scroll', addStick);


		$('main').on('click', '.file a', function(event) {
			event.preventDefault();
			if ($(this).parent('li').hasClass('is-active')) {
				$('.file').removeClass('is-active');
			} else {
				$('.file').removeClass('is-active');
				$(this).parent('li').addClass('is-active');
			}
		});

		$('main').on('click', '.menu .icon-plus', function(event) {
			event.preventDefault();
			if ($('body').hasClass('nav-is-open')) {
				$('body').removeClass('nav-is-open');
			} else {
				$('body').addClass('nav-is-open');
			}
		});
		$('main').on('click', '.menu-nav a', function(event) {
			if ($('body').hasClass('nav-is-open')) {
				$('body').addClass('no-animate').removeClass('nav-is-open');
				setTimeout(function() {
					$('body').removeClass('no-animate');
				},600);
			}
		});
		$('main').on('click', '.menu-mask', function(event) {
			if ($('body').hasClass('nav-is-open')) {
				$('body').removeClass('nav-is-open');
			}
		});


	});


	/* optional triggers

	$(window).load(function() {

	});

	$(window).resize(function() {

	});

	*/

})(window.jQuery);
