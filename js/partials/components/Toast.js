/* global document, HTMLButtonElement, HTMLElement, window */

const TOAST_TIMEOUTS = new WeakMap();

if ( Object.prototype.hasOwnProperty.call( window, 'toast' ) ) {
	throw Error( `window.toast is already set.` );
}

/**
 * Shows or hides a Toast notification.
 *
 * @since September 11, 2026
 *
 * @param {string} id Toast identifier.
 * @param {boolean} status Whether to show the Toast.
 */
window.toast = function toast( id, status ) {

	if ( 'string' !== typeof id ) {
		throw new TypeError( `id must be a string.` );
	}

	if ( 'boolean' !== typeof status ) {
		throw new TypeError( `status must be a boolean.` );
	}

	document.querySelectorAll( '.Toast' ).forEach( function ( toastElement ) {

		if ( false === toastElement instanceof HTMLElement ) {
			return;
		}

		toastElement.classList.add( 'Toast--hidden' );

		if ( TOAST_TIMEOUTS.has( toastElement ) ) {
			window.clearTimeout( TOAST_TIMEOUTS.get( toastElement ) );
			TOAST_TIMEOUTS.delete( toastElement );
		}
	} );

	if ( false === status ) {
		return;
	}

	const toastElement = document.getElementById( `Toast--${ id }` );

	if ( false === toastElement instanceof HTMLElement ) {
		return;
	}

	toastElement.classList.remove( 'Toast--hidden' );
	TOAST_TIMEOUTS.set( toastElement, window.setTimeout( function () {
		toastElement.classList.add( 'Toast--hidden' );
		TOAST_TIMEOUTS.delete( toastElement );
	}, 5000 ) );
};

document.addEventListener( 'DOMContentLoaded', function () {

	document.querySelectorAll( '[data-close-id]' ).forEach( function ( button ) {

		if ( false === button instanceof HTMLButtonElement ) {
			return;
		}

		button.addEventListener( 'click', function ( event ) {

			if ( false === event.currentTarget instanceof HTMLButtonElement ) {
				return;
			}

			window.toast( event.currentTarget.dataset.closeId, false );
		} );
	} );
} );
