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

		function cycleImages(){
			var $active = $('#background_cycler .active');
			var $next = ($('#background_cycler .active').next().length > 0) ? $('#background_cycler .active').next() : $('#background_cycler .img:first');
			$next.css('z-index',2);//move the next image up the pile
			$active.fadeOut(1000,function(){//fade out the top image
				$active.css('z-index',1).show().removeClass('active');//reset the z-index and unhide the image
				$next.css('z-index',3).addClass('active');//make the next image the top one
			});
		}

	});


	/* optional triggers

	$(window).load(function() {

	});

	$(window).resize(function() {

	});

	*/

})(window.jQuery);
