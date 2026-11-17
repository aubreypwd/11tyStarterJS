export default class Services {

	static styles = {
		10: 'css/partials/sections/Services.css',
	};

	static services = [
		{
			name: 'Primary Business Category',
			content: `Start with the work that matters most. You can turn an early idea into a defined scope, compare the practical options, and agree what happens first.

				Northline & Co. is a fictional business. This category demonstrates discovery, planning, delivery, and review services with written notes at each stage.`,
			permalink: '/primary-business-category/',
			permalinkCta: 'Explore Primary Business Category',
		},
		{
			name: 'Secondary Category A',
			content: `When the details need a closer look, you can focus on one decision at a time. Check the scope, compare approaches, or work out a schedule before moving ahead.

				These sample services show how Northline & Co. would help you understand the differences between your options and keep unresolved questions visible.`,
			permalink: '/secondary-category-a/',
			permalinkCta: 'Explore Secondary Category A',
		},
		{
			name: 'Secondary Category B',
			content: `You can return with a new question without rebuilding the whole plan. A second review, a short support session, or organized project records can help you decide what comes next.

				This fictional category demonstrates ongoing support alongside larger projects, with room to pause or change direction.`,
			permalink: '/secondary-category-b/',
			permalinkCta: 'Explore Secondary Category B',
		},
	];

	render( data, context, options = {} ) {

		options = {
			variation: 'default',
			...options,
		};

		return data.partials.Section.render( data, this,
			{
				name: 'Services',
				variation: options.variation,
				containerVariation: 'medium',
			},

			/* html */ `

				${ data.partials.SectionHeader.render( data, this, {
					name: 'Services',
					content: 'Three Ways to Move Your Project Forward',
					eyebrow: 'Services at Northline & Co.',
					eyebrowTag: 'h2',
					tag: 'span',
					headingClass: 'Serif Serif--regular',
				} ) }

				<div class="Services__cards">
					${ this.buildServices( data ) }
				</div>
			`,
		);
	}

	buildServices( data ) {

		let markup = ``;

		for ( const service of Services.services ) {
			markup += this.renderServiceCard( data, service );
		}

		return markup;
	}

	renderServiceCard( data, service ) {

		return /* html */ `
			<div class="Services__cards-card">

				<div class="Services__cards-card-image">
					${ data.partials.Link.render( data, this,  {
						content: /* html */ `<img class="Services__cards-card-img" src="https://placehold.co/800x600/173d69/f5f9ff?text=${ encodeURIComponent( service.name ) }" alt="${ data.fn.escHtml( service.name ) }" width="800" height="600" loading="lazy" decoding="async" eleventy:ignore>`,
						attributes: {
							href: service.permalink,
						},
						umami: {
							event: data.events.gbpServiceLink,
							location: 'Services GBP Service Card',
							context: 'Service Card Image',
						}
					} ) }
				</div>

				<h3 class="Services__cards-card-heading Serif Serif--regular">
					${ data.partials.Link.render( data, this, {
						content: service.name,
						attributes: {
							href: service.permalink,
							class: 'Services__cards-card-heading-link',
						},
						umami: {
							event: data.events.gbpServiceLink,
							location: 'Services GBP Service Card',
							context: 'Service Card Heading',
						}
					} ) }
				</h3>

				<div class="Services__cards-card-content SansSerif SansSerif--regular">
					${ data.fn.markdown( service.content ) }
				</div>

				${ data.partials.Link.render( data, this, {
					content: `${ service.permalinkCta } &rarr;`,
					attributes: {
						href: service.permalink,
						class: 'Services__cards-card-link',
					},
					umami: {
						event: data.events.gbpServiceLink,
						location: 'Services GBP Service Card',
						context: 'Service Card Link',
					}
				} ) }
			</div>
		`;
	}
}
