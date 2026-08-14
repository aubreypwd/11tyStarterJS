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
				 * Provide a default title for pages without one.
				 *
				 * @since August 10, 2026
				 *
				 * @param {object} data Eleventy data cascade.
				 * @return {string} Page title.
				 */
				title ( data ) {
					return data.title || data.schema?.localBusiness?.name;
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
