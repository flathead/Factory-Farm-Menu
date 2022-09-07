jQuery( function ( $ ) {

	/* const typed = new Typed( '#farm-title', {
		strings: ['Пожалуйста, подождите'],
		typeSpeed: 30,
		stringsElement: null,
		smartBackspace: true,
	} ); */

	// Когда изображения в ферме загружены - снять прелоадер
	$( '.farm-item img' ).waitForImages( function () {
		$( '.farm-container' ).addClass( 'loaded' );
		/* if ( $( window ).width() >= 480 ) {
			typed.strings = ['Наведите курсор на любой блок'];
		} else {
			typed.strings = ['Нажмите на любой блок'];
		} */
		/* typed.reset(); */
	});

	// При наведении на блок скрывать облака
	/* $( '.farm-item' ).on( 'mouseenter', function () {
		$( '.clouds' ).fadeOut( 300 );
	} ); */

	// Если курсор за пределами контейнера "фермы" - показывать облака через 300мс
	/* $( '.farm-container' ).on( 'mouseleave', function () {
		setTimeout(function () {
			$( '.clouds' ).fadeIn( 1000 );
		}, 300);
	} ); */

	// При наведении на блок переносить атрибут названия в заголовок
	if ( $( window ).width() >= 480 ) {
		$(document).on('mouseenter', function(e) {
			/* console.log(e.target); */
			const farmLink = $( 'a[data-interactive="true"]' );
			if ( ! e.target == farmLink ) {
				$( '#current-block-title' ).hide();
				$( '#current-block-link' ).hide();
			}
		} );

		$( 'a[data-interactive^="true"]' )
		.on( 
			'mouseenter', function() {
				const linkData = $( this ).attr( 'data-menu' );

				/* typed.strings = ['<img width="20" height="auto" src="./assets/images/svg/link.svg" alt="" />' + linkData];
				typed.reset();

				$( '#link-anonce' ).addClass('show'); */

				$( '#current-block-title' ).html( linkData ).show();

				/* console.log('Выделено: ' + typed.strings); */
			},
		).on(
			'mouseleave', function() {
				/* $( '#farm-title' ).css( { 'font-weight' : 'normal' } );
				typed.strings = [ 'Наведите курсор на любой блок' ];
				typed.reset();
				$( '#link-anonce' ).removeClass('show'); */

				$( '#current-block-title' ).hide();
			}
		);
	} else {

		$( 'a[data-interactive="true"]' ).on( 'click', function() {
			const linkData = $( this ).attr( 'data-menu' );
			const linkHref = $( this ).attr( 'href' );

			$( '#current-block-title' ).html( linkData ).attr( 'href', linkHref ).show();
			$( '#current-block-link' ).attr( 'href', linkHref );

			return false;
		} );
		$(document).on('click', function(e) {
			const farmLink = $( 'a[data-interactive="true"]' );
			if ( ! e.target == farmLink ) {
				$( '#current-block-title' ).hide();
				$( '#current-block-link' ).hide();
			}
		});
	}

	// При скролле скрывать блок с информацией
	$( '.farm-container' ).on( 'scroll', function() {
		$( '.float-info' ).removeClass( 'hovered' );
	} );

	// При наведении на блок показывать всплывающее окно с информацией
    const followCursor = () => {
		const el = document.querySelector( '.float-info' );
		const farm = document.querySelector( '.farm-wrapper' );
	
		farm.addEventListener( 'mousemove', e => {
		  let target = e.target;
		  if ( !target ) return;
	
		  if ( target.closest( 'a' ) ) {
			if ( window.innerWidth >= 480 ) {
				el.classList.add( 'hovered' );
			} else {
				setTimeout(() => {
					el.classList.add( 'hovered' );
				}, 50);
			}
			
		  } else {
			el.classList.remove( 'hovered' );
		  }
	
		  el.style.left = e.pageX + 'px';
		  el.style.top = e.pageY + 'px';
		} );
	}

	followCursor();

} );
