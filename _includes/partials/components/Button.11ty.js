export default class Button {

	render( data, options = {} ) {

		options = {
			attributes: {},
			...options,
		};

		if ( options.hasOwnProperty( 'umami' ) ) {

			// Set default event.
			options.umami.event = options.umami.event || 'Button';
		}

		// Always add the Button class.
		options.attributes.class = `Button ${ options.attributes.class || 'None' }`;

		return data.fn.createElement(
			'button',
			options.content,
			options.attributes,
			options,
		);
	}
}
