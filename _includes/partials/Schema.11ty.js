import UnheadSchema from '../utils/UnheadSchema.11ty.js';
import { defineWebPage, defineWebSite } from '@unhead/schema-org';

export default class Schema {
	render( data, context = this ) {

		return new UnheadSchema().render( data, {
			WebSite: defineWebSite( {
				name: data.metadata.title,
				description: data.metadata.description,
				inLanguage: data.metadata.language,
				url: data.metadata.url,
			} ),
			WebPage: defineWebPage( {
				name: data.title || data.metadata.title,
				description: data.description || data.metadata.description,
				inLanguage: data.metadata.language,
				url: new URL( data.page?.url || '/', data.metadata.url ).href,
			} ),
			...( data.layoutSchema || {} ),
			...( data.pageSchema || {} ),
		} );
	}
}
