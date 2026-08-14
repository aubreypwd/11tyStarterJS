/**
 * Defines the shared page layout.
 *
 * @since Unknown
 */
export default class Page {

	/**
	 * Provides the shared page layout data.
	 *
	 * @since Unknown
	 *
	 * @return {object} Page layout data.
	 */
	data() {
		return {
			layout: 'layouts/Base.11ty.js',
			eleventyComputed: {

				/**
				 * Build a LAB-style title for the current page.
				 *
				 * @since August 10, 2026
				 * @since August 13, 2026 Uses data.fn.labTitle.
				 *
				 * @param {object} data Eleventy data cascade.
				 * @return {string} Page title.
				 */
				title ( data ) {
					return data.fn.labTitle( data, data.title );
				},
			}
		};
	}

	/**
	 * Returns the rendered page content.
	 *
	 * @since Unknown
	 *
	 * @param {object} data Eleventy data cascade.
	 * @return {string} Rendered page content.
	 */
	render( data ) {
		return data.content; // Content
	}
}
