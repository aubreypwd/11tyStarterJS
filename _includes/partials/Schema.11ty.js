import UnheadSchema
	from '../utils/UnheadSchema.11ty.js';

import {
	defineWebPage,
	defineWebSite
} from '@unhead/schema-org';

export default class Schema {

	// Render
	render( data, context = this ) {

		this.fn = data.fn;
		this.context = context;

		return new UnheadSchema().render( data, {

			WebSite: defineWebSite( {
				name: data.metadata.title,
				description: data.metadata.description,
				inLanguage: data.metadata.language,
				url: data.metadata.url, // Website URL.
			} ),

			WebPage: defineWebPage( {
				name: data.metadata.title,
				description: data.metadata.description,
				inLanguage: data.metadata.language,
				url: data.url, // Page URL.
			} ),

			...( data.layoutSchema || {} ),
			...( data.pageSchema || {} ),
		} );
	}
}
