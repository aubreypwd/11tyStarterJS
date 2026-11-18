export default class Tags {

	data() {
		return {
			layout: 'layouts/Page.11ty.js',
			// permalink: '/tags/',
			permalink: false,
			eleventyExcludeFromCollections: true,
			title: 'Tags',
		};
	}

	render( data ) {

		return /* html */ `
			<h1>Tags</h1>

			<ul>
				${
					// Start with every collection name, remove Eleventy's built-in buckets, and sort the rest.
					data.fn.filterTagList( Object.keys( data.collections || {} ) )
						.sort( ( a, b ) => b.localeCompare( a ) )
						.map( ( tag ) => this.renderTagListItem( data, tag ) )
						.join( '' )
				}
			</ul>
		`;
	}

	renderTagListItem( data, tag ) {
		return /* html */ `<li><a href="${ data.fn.escHtml( `/tags/${ this.slugify( tag ) }/` ) }" class="PostTag">${ data.fn.escHtml( tag ) }</a></li>`;
	}
}
