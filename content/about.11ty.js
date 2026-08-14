/**
 * Renders the starter about page.
 *
 * @since August 13, 2026
 */
export default class About {

	/**
	 * Provides about-page data.
	 *
	 * @since August 13, 2026
	 *
	 * @return {object} About-page data.
	 */

	data() {
		return {
			layout: 'layouts/Page.11ty.js',
			permalink: '/about/',
			title: 'About | 11ty Starter JS',
			description: 'An example about page for a local-business website starter.',
			eleventyNavigation: {
				key: 'About',
				order: 3,
			},
		};
	}

	/**
	 * Renders the about page.
	 *
	 * @since August 13, 2026
	 *
	 * @param {object} data Eleventy data cascade.
	 * @return {string} About-page HTML.
	 */
	render( data ) {
		return /* html */ `
			<h1>About this starter</h1>
			${ data.fn.markdown( `
				This example site is designed to be adapted for a local business. It includes a flexible page structure, service-category examples, a blog, contact form, business hours, service areas, team bios, testimonials, and local business schema.

				Replace the example information with real, verified details before launch. The layout and components are intentionally general so the next project can become a different kind of business without carrying over assumptions from another site.
			` ) }
		`;
	}
}
