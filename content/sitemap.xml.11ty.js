export default class Sitemap {
	data() {
		return {
			permalink: '/sitemap.xml',
			layout: false,
			eleventyExcludeFromCollections: true,
		};
	}

	render( data ) {
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
						<loc>${ data.fn.escHtml( absoluteUrl ) }</loc>
						<lastmod>${ data.fn.escHtml( data.fn.dateToFormat( page.date, 'yyyy-LL-dd' ) ) }</lastmod>
					</url>
				`;
			} ).join( '' ) }
			</urlset>
		`.trimStart();
	}
}
