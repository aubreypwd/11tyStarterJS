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
		// 10: 'css/partials/components/Toast.css',
	};

	/**
	 * JavaScript file paths keyed by numeric load priority.
	 *
	 * @since September 11, 2026
	 *
	 * @type {object}
	 */
	static scripts = {
		// 10: 'js/partials/components/Toast.js',
	};

	/**
	 * Renders a hidden Toast notification.
	 *
	 * @since September 11, 2026
	 * @since September 15, 2026 Adds explicit Flex classes.
	 * @since October 27, 2026 Moves layout into the component stylesheet.
	 * @since October 29, 2026 Accepts toast settings as an options object.
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @param {object} options Toast identifier and display values.
	 * @return {string} Toast HTML.
	 */
	render( data, context, options = {} ) {

		if ( null === data || 'object' !== typeof data ) {
			throw new TypeError( `data must be an object.` );
		}

		options = {
			cl: '',
			message: 'This is the default message.',
			close: '×',
			...options,
		};

		if ( 'string' !== typeof options.id || '' === options.id.trim() ) {
			throw new TypeError( `id must be a non-empty string.` );
		}

		if ( 'string' !== typeof options.cl ) {
			throw new TypeError( `cl must be a string.` );
		}

		if ( 'string' !== typeof options.message ) {
			throw new TypeError( `message must be a string.` );
		}

		if ( 'string' !== typeof options.close ) {
			throw new TypeError( `close must be a string.` );
		}

		return /* html */ `
			<div
				aria-atomic="true"
				aria-live="${ 'error' === options.cl ? 'assertive' : 'polite' }"
				class="Toast Toast--${ data.fn.escHtml( options.id ) } Toast--${ data.fn.escHtml( options.cl ) } Toast--hidden"
				id="Toast--${ data.fn.escHtml( options.id ) }"
				role="${ 'error' === options.cl ? 'alert' : 'status' }">

				<button
					aria-label="Close notification"
					class="Toast__close"
					data-close-id="${ data.fn.escHtml( options.id ) }"
					type="button">${ data.fn.escHtml( options.close ) }</button>

				<p class="Toast__message">${ data.fn.escHtml( options.message ) }</p>
			</div>
		`;
	}
}
