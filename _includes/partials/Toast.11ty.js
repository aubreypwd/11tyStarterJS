/**
 * Renders a reusable Toast notification.
 *
 * @since September 11, 2026
 */
export default class Toast {

	/**
	 * CSS file paths keyed by numeric load priority.
	 *
	 * @since September 11, 2026
	 *
	 * @type {object}
	 */
	static styles = {
		10: 'css/Toast.css',
	};

	/**
	 * JavaScript file paths keyed by numeric load priority.
	 *
	 * @since September 11, 2026
	 *
	 * @type {object}
	 */
	static scripts = {
		10: 'js/Toast.js',
	};

	/**
	 * Renders a hidden Toast notification.
	 *
	 * @since September 11, 2026
	 * @since September 15, 2026 Adds explicit Flex classes.
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @param {string} id Toast identifier.
	 * @param {string} cl Toast modifier class.
	 * @param {string} message Toast message.
	 * @param {string} close Visible close-button text.
	 * @return {string} Toast HTML.
	 */
	render(
		data,
		context,
		id,
		cl = '',
		message = 'This is the default message.',
		close = '×'
	) {

		if ( null === data || 'object' !== typeof data ) {
			throw new TypeError( `data must be an object.` );
		}

		if ( 'string' !== typeof id || '' === id.trim() ) {
			throw new TypeError( `id must be a non-empty string.` );
		}

		if ( 'string' !== typeof cl ) {
			throw new TypeError( `cl must be a string.` );
		}

		if ( 'string' !== typeof message ) {
			throw new TypeError( `message must be a string.` );
		}

		if ( 'string' !== typeof close ) {
			throw new TypeError( `close must be a string.` );
		}

		return /* html */ `
			<div
				aria-atomic="true"
				aria-live="${ 'error' === cl ? 'assertive' : 'polite' }"
				class="Toast Toast--${ data.fn.escHtml( id ) } Toast--${ data.fn.escHtml( cl ) } Toast--hidden Flex Flex--0-row-items-center"
				id="Toast--${ data.fn.escHtml( id ) }"
				role="${ 'error' === cl ? 'alert' : 'status' }">

				<button
					aria-label="Close notification"
					class="Toast__close Flex Flex--inline Flex--0-row-horizontal-center Flex--0-row-items-center"
					data-close-id="${ data.fn.escHtml( id ) }"
					type="button">${ data.fn.escHtml( close ) }</button>

				<p class="Toast__message">${ data.fn.escHtml( message ) }</p>
			</div>
		`;
	}
}
