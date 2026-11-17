export default class About {

	static styles = {
		10: 'css/partials/sections/About.css',
	};

	render( data, context, options = {} ) {

		options = {
			variation: 'default',
			...options,
		};

		return data.partials.Section.render( data, this,
			{
				name: 'About',
				variation: options.variation,
				containerVariation: 'default',
			},
			/* html */ `

					<div class="About__photo">
						<div class="About__photo-container">
							<img class="About__photo-image" src="https://placehold.co/600x600/173d69/f5f9ff?text=Team+Portrait" alt="Team portrait placeholder" width="600" height="600" loading="lazy" decoding="async" eleventy:ignore>
						</div>
					</div>

					<div class="About__info">

						${ data.partials.SectionHeader.render( data, this, {
							name: 'About',
							eyebrow: 'About Alex',
							eyebrowTag: 'h2',
							tag: 'span',
							content: 'Meet the Person Behind the Plan',
							headingClass: 'About__info-heading Serif Serif--regular',
						} ) }

						<div class="About__info-content SansSerif SansSerif--regular">
							${ data.fn.markdown( this.mdContent() ) }

						</div>
					</div>
			`,
		);
	}

	mdContent() {
		return `
			Alex Morgan is the fictional owner of Northline & Co. This sample business was created to show how a local website can explain its services, introduce the person behind them, and make the next step easy to find.

			In this example, you work with Alex from the first conversation through the project review. Your priorities, decisions, and open questions stay in a shared written plan.
		`;
	}
}
