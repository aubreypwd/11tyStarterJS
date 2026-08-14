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
			title: 'About',
			description: 'A simple about page for a local-business website starter.',
			eleventyNavigation: {
				key: 'About',
				title: 'About',
				order: 2,
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
				This starter provides a simple Eleventy foundation for a local business website, with reusable layouts, a blog, and local business schema.

				Replace this page and the example business values with the details for the next project.
			` ) }
		`;
	}
}
