jQuery( function ( $ ) {
	// Когда изображения в ферме загружены - снять прелоадер
	$( window ).on( 'load', function() {
		$( '.farm-item img' ).waitForImages( function () {
			$( '.farm-container' ).addClass( 'loaded' );
		} );
	} );

	// При прокрутке мышкой на меню добавить горизонтальный скролл
	$( '.farm-container' ).on( 'mousewheel DOMMouseScroll', function( event ) {
        const delta = Math.max( -1, Math.min( 1, ( event.originalEvent.wheelDelta || -event.originalEvent.detail ) ) );
        $( this ).scrollLeft( $( this ).scrollLeft() - ( delta * 40 ) );
        event.preventDefault();
    } );

	// При наведении на блок переносить атрибут названия в заголовок
	if ( $( window ).width() >= 480 ) {
		$(document).on( 'mouseenter', function( e ) {
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
				$( '#current-block-title' ).html( linkData ).show();
			},
		).on(
			'mouseleave', function() {
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
