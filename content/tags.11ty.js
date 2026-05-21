export default class Tags {
	data() {
		return {
			permalink: '/tags/',
		};
	}

	/**
	 * Turn one tag into a link to its tag archive page.
	 */
	renderTagListItem( tag, fn ) {
		return /* html */ `
			<li>
				<a href="${ fn.escHtml( `/tags/${ this.slugify( tag ) }/` ) }" class="post-tag">${ fn.escHtml( tag ) }</a>
			</li>
		`;
	}

	render( data ) {
		// Start with every collection name, remove Eleventy’s built-in buckets, and sort the rest.
		return /* html */ `
			<h1>Tags</h1>

			<ul>
				${ data.fn.filterTagList( Object.keys( data.collections || {} ) )
					.sort( ( a, b ) => b.localeCompare( a ) )
					.map( ( tag ) => this.renderTagListItem( tag, data.fn ) )
					.join( '' ) }
			</ul>
		`;
	}
}
