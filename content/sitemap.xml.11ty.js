export default class Sitemap {
	data() {
		return {
			permalink: '/sitemap.xml',
			layout: false,
			eleventyExcludeFromCollections: true,
		};
	}

	render( data ) {
		const functions = data.functions;
		const siteUrl = data.metadata.url;
		const pages = data.collections?.all || [];

		return /* xml */ `
			<?xml version="1.0" encoding="utf-8"?>
			<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
			${ pages.map( ( page ) => {
				if ( page.data?.permalink === false ) {
					return '';
				}

				const absoluteUrl = new URL( page.url, siteUrl ).href;

				return /* xml */ `
					<url>
						<loc>${ functions.escapeHtml( absoluteUrl ) }</loc>
						<lastmod>${ functions.escapeHtml( functions.dateToFormat( page.date, 'yyyy-LL-dd' ) ) }</lastmod>
					</url>
				`;
			} ).join( '' ) }
			</urlset>
		`.trimStart();
	}
}
