import UnheadSchema
	from '../../utils/UnheadSchema.11ty.js';

import {
	defineWebPage,
	defineWebSite
} from '@unhead/schema-org';
export default class Schema {

	render( data ) {

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
