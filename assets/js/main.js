jQuery(function ($) {
	$('.farm-item').on('mouseenter', function () {
		$( 'Hide the clouds!' )
		$('.clouds').fadeOut(300);
	});
	$('.farm-container').on('mouseleave', function () {
		console.log('Farm zone cursor leave...');
		setTimeout(function () {
			$('.clouds').fadeIn(1000);
		}, 1000);
	});
	$('.farm-item img').waitForImages( function () {
		console.log( 'All farm images done!' );
		$('.farm-container').addClass('loaded');
	});
});