export default class Toast {

	static styles = {
		// 10: 'css/partials/components/Toast.css',
	};

	static scripts = {
		// 10: 'js/partials/components/Toast.js',
	};

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
