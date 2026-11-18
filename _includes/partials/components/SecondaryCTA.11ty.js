export default class SecondaryCTA {
	render( data, options = {} ) {

		options = {
			analyticsLocation: 'Unknown',
			className: '',

			...options,
		};

		const phoneFormatted = data.fn.formatPhone( data.schema.localBusiness.telephone );

		return /* html */ `
			${ data.partials.Link.render(
				data,
				{
					content: phoneFormatted,
					attributes: {
						href: `tel:${ data.schema.localBusiness.telephone }`,
						title: `Call ${ phoneFormatted }`,
						class: `SecondaryCTA Button Button--alt ${ options.className }`,
					},
					umami: {
						event: data.events.callButton,
						location: options.analyticsLocation,
					},
				},
			) }
		`;
	}
}
