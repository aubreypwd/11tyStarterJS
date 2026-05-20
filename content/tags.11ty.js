export default class Tags {
	renderTagListItem( tag, functions ) {
		return /* html */ `
			<li>
				<a href="${ functions.escapeHtml( `/tags/${ this.slugify( tag ) }/` ) }" class="post-tag">${ functions.escapeHtml( tag ) }</a>
			</li>
		`;
	}

	render( data ) {
		const tags = data.functions.filterTagList( Object.keys( data.collections || {} ) )
			.sort( ( a, b ) => b.localeCompare( a ) );

		return /* html */ `
			<h1>Tags</h1>

			<ul>
				${ tags.map( ( tag ) => this.renderTagListItem( tag, data.functions ) ).join( '' ) }
			</ul>
		`;
	}
}
