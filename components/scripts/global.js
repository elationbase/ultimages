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

	});


	/* optional triggers

	$(window).load(function() {

	});

	$(window).resize(function() {

	});

	*/

})(window.jQuery);
