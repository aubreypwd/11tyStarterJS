export default class ServiceAreas {

	static styles = {
		10: 'css/partials/sections/ServiceAreas.css',
	};

	render( data, context, options = {} ) {

		options = {
			variation: 'default',
			...options,
		};

		return data.partials.Section.render( data, this,
			{
				name: 'ServiceAreas',
				variation: options.variation,
				containerVariation: 'medium',
			},
			/* html */ `

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
						${ data.partials.SectionHeader.render( data, this, {
							name: 'ServiceAreas',
							eyebrow: 'Nearby Neighborhoods & Communities',
							content: 'Serving Example City and Its Neighbors',
							headingClass: 'ServiceAreas__content-heading Serif Serif--regular',
						} ) }

						<p class="ServiceAreas__content-info">Northline &amp; Co. is a fictional business serving the example communities below. The map shows Central Park in New York as a sample location, not the business address.</p>

						<ul class="ServiceAreas__areas">
							${ this.renderAreas( data, context ) }
						</ul>
					</div>
			`,
		);
	}

	renderAreas( data, context ) {

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
