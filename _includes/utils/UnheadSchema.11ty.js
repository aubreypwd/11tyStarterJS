import { createSchemaOrgGraph } from '@unhead/schema-org';
export default class UnheadSchema {

	render( data, schema = {} ) {
		const graph = createSchemaOrgGraph();
		const path = data.page?.url || '/'; // Might be the home dir.
		const business = data.schema.localBusiness;

		graph.push( Object.values( schema ).filter( Boolean ) );

		return /* html */ `
			<script type="application/ld+json" eleventy:ignore>
				${ JSON.stringify( {
					'@context': 'https://schema.org',
					'@graph': graph.resolveGraph( {
						path: path,
						host: data.metadata.url,
						inLanguage: data.language || data.metadata.language,
						title: data.title || business.name,
						description: data.description || business.description,
						trailingSlash: path === '/' || path.endsWith( '/' ),
					} ),
				} ) }
			</script>
		`.trimStart();
	}
}
