export default class Tags {
	/**
	 * Turn one tag into a link to its tag archive page.
	 */
	renderTagListItem( tag, functions ) {
		return /* html */ `
			<li>
				<a href="${ functions.escapeHtml( `/tags/${ this.slugify( tag ) }/` ) }" class="post-tag">${ functions.escapeHtml( tag ) }</a>
			</li>
		`;
	}

	render( data ) {
		// Start with every collection name, remove Eleventy’s built-in buckets, and sort the rest.
		return /* html */ `
			<h1>Tags</h1>

			<ul>
				${ data.functions.filterTagList( Object.keys( data.collections || {} ) )
					.sort( ( a, b ) => b.localeCompare( a ) )
					.map( ( tag ) => this.renderTagListItem( tag, data.functions ) )
					.join( '' ) }
			</ul>
		`;
	}
}
