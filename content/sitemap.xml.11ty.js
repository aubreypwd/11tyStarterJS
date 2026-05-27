export default class Sitemap {

	// Data
	data() {
		return {
			permalink: '/sitemap.xml',
			layout: false,
			eleventyExcludeFromCollections: true,
		};
	}

	// Render
	render( data ) {

		this.fn = data.fn;

		return /* xml */ `
			<?xml version="1.0" encoding="utf-8"?>
			<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
			${ ( data.collections?.all || [] ).map( ( page ) => {
				if ( page.data?.permalink === false ) {
					return '';
				}

				const absoluteUrl = new URL( page.url, data.metadata.url ).href;

				return /* xml */ `
					<url>
						<loc>${ this.fn.escHtml( absoluteUrl ) }</loc>
						<lastmod>${ this.fn.escHtml( this.fn.dateToFormat( page.date, 'yyyy-LL-dd' ) ) }</lastmod>
					</url>
				`;
			} ).join( '' ) }
			</urlset>
		`.trimStart();
	}
}
