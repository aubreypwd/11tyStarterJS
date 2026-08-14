/**
 * Defines the Website Design category page.
 *
 * @since August 13, 2026
 */
export default class WebsiteDesign {

	/**
	 * Provides Website Design page data.
	 *
	 * @since August 13, 2026
	 *
	 * @return {object} Website Design page data.
	 */
	data() {
		return {
			layout: 'layouts/ServiceCategory.11ty.js',
			permalink: '/website-design/',
			serviceCategoryKey: 'websiteDesign',
			hero: {
				heading: 'Website Design',
				description: 'A clear website structure helps a local business explain what it does, show useful details, and make the next step easy to find.',
			},
		};
	}

	/**
	 * Renders the Website Design category page.
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
						<h2 class="SectionHeader__heading">Website Design Examples</h2>
						<span class="SectionHeader__separator"></span>
						<p class="SectionHeader__brow">A practical foundation for a local business</p>
					</header>

					<div class="ServiceCategory__service-list">
						${ data.partials.ServiceSummary.render( data, this, 'starter-website', 'Starter Website', `A focused set of pages that introduces the business, its services, and the next useful step for prospective customers.`, 'Contact Us About Website Design' ) }
						${ data.partials.ServiceSummary.render( data, this, 'website-refresh', 'Website Refresh', `A thoughtful update to an existing site structure, content hierarchy, and calls to action.`, 'Contact Us About a Refresh' ) }
						${ data.partials.ServiceSummary.render( data, this, 'launch-support', 'Launch Support', `A final pass over content, links, accessibility, and launch details before the site goes live.`, 'Contact Us About Launch Support' ) }
					</div>
				</div>
			</section>
		`;
	}
}
