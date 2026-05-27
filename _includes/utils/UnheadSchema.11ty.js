import { createSchemaOrgGraph } from '@unhead/schema-org';

export default class UnheadSchema {

	// Render
	render( data, schema = {} ) {

		this.fn = data.fn;

		const graph = createSchemaOrgGraph();
		const path = data.page?.url || '/'; // Might be the home dir.

		graph.push( Object.values( schema ).filter( Boolean ) );

		return /* html */ `
			<script type="application/ld+json" eleventy:ignore>
				${ JSON.stringify( {
					'@context': 'https://schema.org',
					'@graph': graph.resolveGraph( {
						path: path,
						host: data.metadata.url || data.page.url,
						inLanguage: data.language || data.metadata.language,
						title: data.title || data.metadata.title,
						description: data.description || data.metadata.description,
						trailingSlash: path === '/' || path.endsWith( '/' ),
					} ),
				}, null, 2 ) }
			</script>
		`.trimStart();
	}
}
