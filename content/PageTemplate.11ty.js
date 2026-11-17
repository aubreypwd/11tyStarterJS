export default class PageTemplate {

	data() {
		return {

			layout: 'layouts/Page.11ty.js',
			title: 'Page Template',
			description: 'This is just a page template.',
			eleventyExcludeFromCollections: true,

			eleventyComputed: {
				permalink( data ) {
					// return data.fn.isProduction() ? false : '/page-template/';
					return false;
				}
			}
		};
	}

	render( data ) {
		return data.fn.printFile( 'md/PageTemplate.md', data );
	}
}
