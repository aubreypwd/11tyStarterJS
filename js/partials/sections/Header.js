document.addEventListener( 'DOMContentLoaded', function () {

	const header = document.getElementById( 'header' );
	const trigger = document.getElementById( 'Header__mobile-trigger' );

	if ( false === header instanceof HTMLElement || false === trigger instanceof HTMLButtonElement ) {
		return;
	}

	const mobile = window.matchMedia( '(width < 768px)' );
	let isOpen = false;

	const setNavigation = function ( open ) {

		isOpen = open;
		header.classList.toggle( 'Header__mobile-active', open );
		trigger.setAttribute( 'aria-expanded', String( open ) );
	};

	trigger.addEventListener( 'click', function () {
		setNavigation( false === isOpen );
	} );

	header.addEventListener( 'click', function ( event ) {

		if ( isOpen && event.target instanceof Element && event.target.closest( 'a[href]' ) ) {
			setNavigation( false );
			trigger.focus();
		}
	} );

	header.addEventListener( 'keydown', function ( event ) {

		if ( isOpen && 'Escape' === event.key ) {
			event.preventDefault();
			setNavigation( false );
			trigger.focus();
		}
	} );

	mobile.addEventListener( 'change', function () {

		if ( false === mobile.matches ) {
			setNavigation( false );

			if ( document.activeElement === trigger ) {
				header.querySelector( '#navigation a[href]' )?.focus();
			}
		}
	} );

	header.classList.add( 'Header--navigation-ready' );
} );
