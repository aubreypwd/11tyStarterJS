import { createSchemaOrgGraph } from '@unhead/schema-org';

export default class SchemaOrg {
	render( data, schema = {} ) {
		const graph = createSchemaOrgGraph();

		graph.push( Object.values( schema ).filter( Boolean ) );

		return /* html */ `
			<script type="application/ld+json" eleventy:ignore>
				${ JSON.stringify( {
					'@context': 'https://schema.org',
					'@graph': graph.resolveGraph( {
						host: data.metadata.url,
						path: data.page?.url || '/',
						inLanguage: data.metadata.language,
						title: data.title || data.metadata.title,
						description: data.description || data.metadata.description,
						trailingSlash: true,
					} ),
				}, null, 2 ) }
			</script>
		`.trimStart();
	}
}
