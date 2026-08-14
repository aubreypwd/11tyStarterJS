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
				 * Build the page title with the starter category context.
				 *
				 * @since August 10, 2026
				 *
				 * @param {object} data Eleventy data cascade.
				 * @return {string} Page title.
				 */
				title ( data ) {
					return `${ data.title || data.schema?.localBusiness?.name } ${ data.metadata.settings.titleSeparator } ${ data.fn.serviceCategoryTitle( data, data.ServiceCategories.websiteDesign.title ) }`;
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
