export default class NavigationLinks {

	render( data, options = {} ) {

		// Base navigation links.
		return /* html */ `

			${ this.renderItem(
				data,
				options,
				{
					content: 'Home',
					attributes: {
						class: `NavigationItem__link ${ options.linkClassName ?? `` }`,
						href: '/',
					},
					umami: {
						event: data.events.navigation,
						location: options.analyticsLocation,
						context: 'Home',
					},
				},
			) }

			${ this.renderItem(
				data,
				options,
				{
					content: 'About Alex',
					attributes: {
						class: `NavigationItem__link ${ options.linkClassName ?? `` }`,
						href: '#about',
					},
					umami: {
						event: data.events.navigation,
						location: options.analyticsLocation,
						context: 'About Alex',
					},
				},
			) }

			${ this.renderItem(
				data,
				options,
				{
					content: 'Services',
					attributes: {
						class: `NavigationItem__link ${ options.linkClassName ?? `` }`,
						href: '/#services',
					},
					umami: {
						event: data.events.navigation,
						location: options.analyticsLocation,
						context: 'Services',
					},
				},
			) }

			${ this.renderAdditionalItems(
				data,
				options,
				options.additionalLinks ?? {},
			) }
		`;
	}

	renderAdditionalItems( data, options, additionalLinks ) {

		let markup = ``;

		for ( const link in additionalLinks ) {
			markup += this.renderItem( data, options, additionalLinks[ link ] );
		}

		return markup;
	}

	renderItem( data, options, linkOptions ) {

		return /* html */ `
			<li class="NavigationItem ${ options.itemClassName ?? `` }">
				${ data.partials.Link.render( data, linkOptions ) }
			</li>
		`;
	}
}
