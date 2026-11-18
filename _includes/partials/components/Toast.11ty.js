export default class Toast {

	static styles = {
		// 10: 'css/partials/components/Toast.css',
	};

	static scripts = {
		// 10: 'js/partials/components/Toast.js',
	};

	render( data, options = {} ) {

		if ( null === data || 'object' !== typeof data ) {
			throw new TypeError( `data must be an object.` );
		}

		options = {
			status: '',
			message: 'This is the default message.',
			closeIcon: '×',
			...options,
		};

		if ( 'string' !== typeof options.id || '' === options.id.trim() ) {
			throw new TypeError( `id must be a non-empty string.` );
		}

		if ( 'string' !== typeof options.status ) {
			throw new TypeError( `status must be a string.` );
		}

		if ( 'string' !== typeof options.message ) {
			throw new TypeError( `message must be a string.` );
		}

		if ( 'string' !== typeof options.closeIcon ) {
			throw new TypeError( `closeIcon must be a string.` );
		}

		return /* html */ `
			<div
				aria-atomic="true"
				aria-live="${ 'error' === options.status ? 'assertive' : 'polite' }"
				class="Toast Toast--${ data.fn.escHtml( options.id ) } Toast--${ data.fn.escHtml( options.status ) } Toast--hidden"
				id="Toast--${ data.fn.escHtml( options.id ) }"
				role="${ 'error' === options.status ? 'alert' : 'status' }">

				<button
					aria-label="Close notification"
					class="Toast__close"
					data-close-id="${ data.fn.escHtml( options.id ) }"
					type="button">${ data.fn.escHtml( options.closeIcon ) }</button>

				<p class="Toast__message">${ data.fn.escHtml( options.message ) }</p>
			</div>
		`;
	}
}
