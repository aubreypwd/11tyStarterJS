/**
 * Defines the Content Strategy category page.
 *
 * @since August 13, 2026
 */
export default class ContentStrategy {

	/**
	 * Provides Content Strategy page data.
	 *
	 * @since August 13, 2026
	 *
	 * @return {object} Content Strategy page data.
	 */
	data() {
		return {
			layout: 'layouts/ServiceCategory.11ty.js',
			permalink: '/content-strategy/',
			serviceCategoryKey: 'contentStrategy',
			hero: {
				heading: 'Content Strategy',
				description: 'Useful local-business content gives customers enough context to understand the offering and decide whether to reach out.',
			},
		};
	}

	/**
	 * Renders the Content Strategy category page.
	 *
	 * @since August 13, 2026
	 *
	 * @param {object} data Eleventy data cascade.
	 * @return {string} Category page HTML.
	 */
	render( data ) {
		return /* html */ `
			<section class="ServiceCategory ServiceCategory__services Container Container--xxl Container--light">
				<div class="Container__content Container__content--large">
					<header class="SectionHeader">
						<h2 class="SectionHeader__heading">Content Strategy Examples</h2>
						<span class="SectionHeader__separator"></span>
						<p class="SectionHeader__brow">Start with the questions customers already ask</p>
					</header>

					<div class="ServiceCategory__service-list">
						${ data.partials.ServiceSummary.render( data, this, 'page-planning', 'Page Planning', `A clear map of the pages and information customers need before they reach out.`, 'Contact Us About Page Planning' ) }
						${ data.partials.ServiceSummary.render( data, this, 'service-messaging', 'Service Messaging', `Plain-language service descriptions that connect an offering to the customer outcome.`, 'Contact Us About Service Messaging' ) }
						${ data.partials.ServiceSummary.render( data, this, 'editorial-direction', 'Editorial Direction', `A manageable set of topics for keeping a business website useful over time.`, 'Contact Us About Editorial Direction' ) }
					</div>
				</div>
			</section>
		`;
	}
}
