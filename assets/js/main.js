jQuery( function ( $ ) {
	// Когда изображения в ферме загружены - снять прелоадер
	$( '.farm-item img' ).waitForImages( function () {
		console.log( 'All farm images done!' );
		$( '.farm-container' ).addClass( 'loaded' );
		$( '#farm-title' ).text( 'Наведите курсор на любой блок' );
	});

	// При наведении на блок скрывать облака
	$( '.farm-item' ).on( 'mouseenter', function () {
		console.log( 'Hide the clouds!' );
		$( '.clouds' ).fadeOut( 300 );
	});

	// Если курсор за пределами контейнера "фермы" - показывать облака через 300мс
	/* $( '.farm-container' ).on( 'mouseleave', function () {
		console.log( 'Farm zone cursor leave...' );
		setTimeout(function () {
			$( '.clouds' ).fadeIn( 1000 );
		}, 300);
	} ); */
	$( 'a[data-interactive^="true"]' ).on( 
		'mouseenter', function() {
			const linkData = $( this ).attr( 'data-menu' );

			$( '#farm-title' ).hide(); // Так быстрее, чем перезагрузка через .load или ajax
			$( '#farm-title' ).show();

			$( '#farm-title' ).text( linkData).css( 
				{	
					'animation' : 'typing ' + (linkData.length * 0.05) + 's, blink-caret .5s step-end infinite alternate',
					'animation-timing-function' : 'steps(' + (linkData.length + 2) +'), step-end', 
					'width' : linkData.length + 2 + 'ch' 
				} 
			);
		},
	).on(
		'mouseleave', function() {
			$( '#farm-title' ).css( { 'animation' : 'none', 'width' : 'auto' } ).text( 'Наведите курсор на любой блок' );
		}
	);
} );