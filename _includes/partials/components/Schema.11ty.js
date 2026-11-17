import UnheadSchema
	from '../../utils/UnheadSchema.11ty.js';

import {
	defineWebPage,
	defineWebSite
} from '@unhead/schema-org';
/**
 * Renders the shared schema graph.
 *
 * @since Unknown
 */
export default class Schema {

	/**
	 * Renders the shared JSON-LD schema.
	 *
	 * @since Unknown
	 * @since October 29, 2026 Accepts a render options object.
	 * @since November 17, 2026 Uses the current page canonical URL for WebPage schema.
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @param {object} options Render options.
	 * @return {string} JSON-LD script HTML.
	 */
	render( data, context = this, options = {} ) {

		// Class Props
		this.context = context;

		// Content
		return new UnheadSchema().render( data, {

			WebSite: defineWebSite( {
				name: data.schema.localBusiness.name,
				description: data.schema.localBusiness.description,
				inLanguage: data.metadata.language,
				url: data.metadata.url,
			} ),

			WebPage: defineWebPage( {
				name: data.title,
				description: data.description,
				inLanguage: data.metadata.language,
				url: new URL( data.page.url, data.metadata.url ).href,
			} ),

			...( data.layoutSchema || {} ),
			...( data.pageSchema || {} ),
		} );
	}
}
