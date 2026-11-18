export default class PrimaryCTA {
	render( data, context, options = {} ) {

		options = {
			location: 'Unknown',
			class: '',

			...options,
		};

		return /* html */ `
			${ data.partials.Link.render(
				data,
				this,
				{
					content: options.content
						? options.content
						: 'Book Now',
					attributes: {
						class: '' === options.class
							? 'Button PrimaryCTA'
							: `Button PrimaryCTA ${ options.class }`,
						href: '#contact',
					},
					umami: {
						event: data.events.bookNowCTA,
						location: options.location,
					},
				},
			) }
		`;
	}
}
