export default class ServiceAreas {

	static styles = {
		10: 'css/partials/sections/ServiceAreas.css',
	};

	render( data, options = {} ) {

		if ( false === options.render ) {
			return '';
		}

		options = {
			variation: 'default',
			sectionHeader: {},
			description: 'Northline & Co. is a fictional business serving the example communities below. The map shows Central Park in New York as a sample location, not the business address.',
			...options,
		};

		return data.partials.Section.render( data,
			{
				sectionName: 'ServiceAreas',
				sectionVariation: options.variation,
				containerVariation: 'medium',
				content: /* html */ `

					<div class="ServiceAreas__google-map">
						<iframe
							class="ServiceAreas__map"
							title="Sample location: Central Park, New York"
							src="https://www.google.com/maps?q=Central%20Park%2C%20New%20York&amp;output=embed"
							width="600"
							height="450"
							loading="lazy"
							referrerpolicy="strict-origin-when-cross-origin"
							allowfullscreen></iframe>
					</div>

					<div class="ServiceAreas__content">
						${ data.partials.SectionHeader.render( data, {
							sectionName: 'ServiceAreas',
							eyebrow: 'Nearby Neighborhoods & Communities',
							heading: 'Serving Example City and Its Neighbors',
							headingClassName: 'ServiceAreas__content-heading Serif Serif--regular',
							...options.sectionHeader,
						} ) }

						<p class="ServiceAreas__content-info">${ data.fn.escHtml( options.description ) }</p>

						<ul class="ServiceAreas__areas">
							${ this.renderAreas( data ) }
						</ul>
					</div>
			`,
		},
		);
	}

	renderAreas( data ) {

		let markup = ``;

		for ( const area of data.schema.localBusiness.areaServed ) {

			markup += /* html */ `
				<li class="ServiceAreas__areas-area SansSerif SansSerif--bold">
					<span class="ServiceAreas__areas-area-icon" aria-hidden="true">•</span>
					<span class="ServiceAreas__areas-area-text">${ area }</span>
				</li>
			`;
		}

		return markup;
	}
}
