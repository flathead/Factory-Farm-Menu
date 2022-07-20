jQuery( function ( $ ) {

	const typed = new Typed( '#farm-title', {
		strings: ['Пожалуйста, подождите'],
		typeSpeed: 30,
		stringsElement: null,
		smartBackspace: true,
	} );

	// Когда изображения в ферме загружены - снять прелоадер
	$( '.farm-item img' ).waitForImages( function () {
		$( '.farm-container' ).addClass( 'loaded' );
		if ( $( window ).width() >= 480 ) {
			typed.strings = ['Наведите курсор на любой блок'];
		} else {
			typed.strings = ['Нажмите на любой блок'];
		}
		typed.reset();
	});

	// При наведении на блок скрывать облака
	$( '.farm-item' ).on( 'mouseenter', function () {
		$( '.clouds' ).fadeOut( 300 );
	} );

	// Если курсор за пределами контейнера "фермы" - показывать облака через 300мс
	$( '.farm-container' ).on( 'mouseleave', function () {
		setTimeout(function () {
			$( '.clouds' ).fadeIn( 1000 );
		}, 300);
	} );

	// При наведении на блок переносить атрибут названия в заголовок
	if ( $( window ).width() >= 480 ) {
		$( 'a[data-interactive^="true"]' )
		.on( 
			'mouseenter', function() {
				const linkData = $( this ).attr( 'data-menu' );

				typed.strings = ['<img width="20" height="auto" src="./assets/images/svg/link.svg" alt="" />' + linkData];
				typed.reset();

				$( '#link-anonce' ).addClass('show');

				console.log('Выделено: ' + typed.strings);
			},
		).on(
			'mouseleave', function() {
				$( '#farm-title' ).css( { 'font-weight' : 'normal' } );
				typed.strings = [ 'Наведите курсор на любой блок' ];
				typed.reset();
				$( '#link-anonce' ).removeClass('show');
			}
		);
	} else {
		$( 'a[data-interactive^="true"]' )
		.on( 
			'mouseenter', function() {
				const linkData = $( this ).attr( 'data-menu' );

				typed.strings = [ '<img width="20" height="auto" src="./assets/images/svg/link.svg" alt="" />' + linkData ];
				typed.reset();
				
				$( '#link-anonce' ).addClass('show');
			},
		).on(
			'mouseleave', function() {
				typed.strings = [ 'Нажмите на любой блок' ];
				typed.reset();

				$( '#link-anonce' ).removeClass('show');

				$( '#farm-title' ).css( { 'font-weight' : 'normal' } );
			}
		);
	}

	
} );
