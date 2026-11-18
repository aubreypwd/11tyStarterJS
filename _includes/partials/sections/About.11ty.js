export default class About {

	static styles = {
		10: 'css/partials/sections/About.css',
	};

	render( data, options = {} ) {

		if ( false === options.render ) {
			return '';
		}

		options = {
			variation: 'default',
			content: this.getAboutCopy(),
			sectionHeader: {},
			...options,
		};

		return data.partials.Section.render( data, {
			sectionName: 'About',
			sectionVariation: options.variation,
			containerVariation: 'default',
			content: /* html */ `
				<div class="About__photo">
					<div class="About__photo-container">
						<img class="About__photo-image" src="https://placehold.co/600x600/173d69/f5f9ff?text=Team+Portrait" alt="Team portrait placeholder" width="600" height="600" loading="lazy" decoding="async" eleventy:ignore>
					</div>
				</div>

				<div class="About__info">

					${ data.partials.SectionHeader.render( data, {
						sectionName: 'About',
						eyebrow: 'About Alex',
						eyebrowTag: 'h2',
						headingTag: 'span',
						heading: 'Meet the Person Behind the Plan',
						headingClassName: 'About__info-heading Serif Serif--regular',
						...options.sectionHeader,
					} ) }

					<div class="About__info-content SansSerif SansSerif--regular">
						${ data.fn.markdown( options.content ) }
					</div>
				</div>
			`,
		} );
	}

	getAboutCopy() {

		return `
			Alex Morgan is the fictional owner of Northline & Co. This sample business was created to show how a local website can explain its services, introduce the person behind them, and make the next step easy to find.

			In this example, you work with Alex from the first conversation through the project review. Your priorities, decisions, and open questions stay in a shared written plan.
		`;
	}
}
