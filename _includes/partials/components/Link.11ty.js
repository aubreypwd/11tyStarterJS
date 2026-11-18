export default class Link {

	render( data, options = {} ) {

		options = {
			attributes: {},
			...options,
		};

		if (
			'string' === typeof options.attributes.href &&
			options.attributes.href.startsWith( '/' ) &&
			false === /[?#]/.test( options.attributes.href ) &&
			options.attributes.href === data.page?.url
		) {
			options.attributes = {
				...options.attributes,
				'aria-current': 'page',
			};
		}

		if ( options.hasOwnProperty( 'umami' ) ) {

			// Set default event.
			options.umami.event = options.umami.event || 'Link';
		}

		return data.fn.createElement(
			'a',
			options.content,
			options.attributes,
			options,
		);
	}
}
