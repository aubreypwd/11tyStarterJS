export default class PrimaryCTA {
	render( data, options = {} ) {

		options = {
			analyticsLocation: 'Unknown',
			className: '',

			...options,
		};

		return /* html */ `
			${ data.partials.Link.render(
				data,
				{
					content: options.label ?? 'Book Now',
					attributes: {
						class: '' === options.className
							? 'Button PrimaryCTA'
							: `Button PrimaryCTA ${ options.className }`,
						href: '#contact',
					},
					umami: {
						event: data.events.bookNowCTA,
						location: options.analyticsLocation,
					},
				},
			) }
		`;
	}
}
