export default class NavigationLinks {

	render( data, context, options = {} ) {

		// Base navigation links.
		return /* html */ `

			${ this.renderItem(
				data,
				options,
				{
					content: 'Home',
					attributes: {
						class: `NavigationItem__link ${ options.linkClass ?? `` }`,
						href: '/',
					},
					umami: {
						event: data.events.navigation,
						location: options.location,
						context: 'Home',
					},
					test: true,
				},
			) }

			${ this.renderItem(
				data,
				options,
				{
					content: 'About Alex',
					attributes: {
						class: `NavigationItem__link ${ options.linkClass ?? `` }`,
						href: '#about',
					},
					umami: {
						event: data.events.navigation,
						location: options.location,
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
						class: `NavigationItem__link ${ options.linkClass ?? `` }`,
						href: '/#services',
					},
					umami: {
						event: data.events.navigation,
						location: options.location,
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
			<li class="NavigationItem ${ options.itemClass ?? `` }">
				${ data.partials.Link.render( data, this, linkOptions ) }
			</li>
		`;
	}
}
