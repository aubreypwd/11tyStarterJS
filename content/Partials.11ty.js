/**
 * Renders the retained reusable partials.
 *
 * @since August 13, 2026
 */
export default class Partials {

	/**
	 * Provides partials-page data.
	 *
	 * @since August 13, 2026
	 *
	 * @return {object} Partials-page data.
	 */
	data() {
		return {
			layout: 'layouts/Page.11ty.js',
			permalink: '/partials/',
			title: 'Partials',
			description: 'Reusable address and business-hours partials for the starter site.',
			eleventyNavigation: {
				key: 'Partials',
				title: 'Partials',
				order: 4,
			},
		};
	}

	/**
	 * Renders the retained partials.
	 *
	 * @since August 13, 2026
	 *
	 * @param {object} data Eleventy data cascade.
	 * @return {string} Partials-page HTML.
	 */
	render( data ) {
		return /* html */ `
			<h1>Partials</h1>

			<section class="Partials">
				<h2>Address</h2>
				${ data.partials.Address.render( data, this ) }

				<h2>Business hours</h2>
				${ data.partials.BusinessHours.render( data, this ) }
			</section>
		`;
	}
}
