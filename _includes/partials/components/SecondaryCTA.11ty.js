export default class SecondaryCTA {
	render( data, context, options = {} ) {

		options = {
			location: 'Unknown',
			class: '',

			...options,
		};

		const phoneFormatted = data.fn.formatPhone( data.schema.localBusiness.telephone );

		return /* html */ `
			${ data.partials.Link.render(
				data,
				this,
				{
					content: phoneFormatted,
					attributes: {
						href: '#',
						title: `Call ${ phoneFormatted }`,
						class: `SecondaryCTA Button Button--alt ${ options.class }`,
					},
					umami: {
						event: data.events.callButton,
						location: options.location,
					},
				},
			) }
		`;
	}
}
