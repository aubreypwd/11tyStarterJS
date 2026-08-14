/**
 * Defines the Local Business Support category page.
 *
 * @since August 13, 2026
 */
export default class LocalBusinessSupport {

	/**
	 * Provides Local Business Support page data.
	 *
	 * @since August 13, 2026
	 *
	 * @return {object} Local Business Support page data.
	 */
	data() {
		return {
			layout: 'layouts/ServiceCategory.11ty.js',
			permalink: '/local-business-support/',
			serviceCategoryKey: 'localBusinessSupport',
			hero: {
				heading: 'Local Business Support',
				description: 'A dependable website foundation makes it easier to keep business information accurate, useful, and ready for the next improvement.',
			},
		};
	}

	/**
	 * Renders the Local Business Support category page.
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
						<h2 class="SectionHeader__heading">Local Business Support Examples</h2>
						<span class="SectionHeader__separator"></span>
						<p class="SectionHeader__brow">Keep the foundation current</p>
					</header>

					<div class="ServiceCategory__service-list">
						${ data.partials.ServiceSummary.render( data, this, 'content-updates', 'Content Updates', `Small, regular changes that keep hours, services, contact information, and announcements current.`, 'Contact Us About Content Updates' ) }
						${ data.partials.ServiceSummary.render( data, this, 'accessibility-review', 'Accessibility Review', `A practical review of headings, links, contrast, and forms for a more welcoming experience.`, 'Contact Us About Accessibility' ) }
						${ data.partials.ServiceSummary.render( data, this, 'performance-tune-up', 'Performance Tune-Up', `A focused review of page weight, markup, and front-end details that affect everyday use.`, 'Contact Us About Performance' ) }
					</div>
				</div>
			</section>
		`;
	}
}
