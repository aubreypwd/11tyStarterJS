export default class TagPages {
	data() {
		return {
			pagination: {
				data: 'collections',
				size: 1,
				alias: 'tag',
				filter: [ 'all', 'posts' ],
			},
			eleventyExcludeFromCollections: true,
			eleventyComputed: {
				title( data ) {
					return `Tagged '${ data.tag }'`;
				},
				permalink: function( data ) {
					// If DuplicatePermalinkOutputError occurs, check that no tag occurs
					// with differing case, e.g. "RSS" and "rss".
					return `/tags/${ this.slugify( data.tag ) }/`;
				},
			},
		};
	}

	renderPostListItem( post, currentUrl, functions ) {
		return /* html */ `
			<li class="postlist-item${ post.url === currentUrl ? ' postlist-item-active' : '' }">
				<a href="${ functions.escapeHtml( post.url ) }" class="postlist-link">${ post.data?.title ? functions.escapeHtml( post.data.title ) : /* html */ `<code>${ functions.escapeHtml( post.url ) }</code>` }</a>
				<time class="postlist-date" datetime="${ functions.escapeHtml( functions.dateToFormat( post.date, 'yyyy-LL-dd' ) ) }">${ functions.escapeHtml( functions.dateToFormat( post.date, 'LLLL yyyy' ) ) }</time>
			</li>
		`;
	}

	renderPostsList( posts, currentUrl, functions ) {
		return /* html */ `
			<ol reversed class="postlist" style="--postlist-index: ${ posts.length + 1 }">
				${ posts.slice().reverse().map( ( post ) => this.renderPostListItem( post, currentUrl, functions ) ).join( '' ) }
			</ol>
		`;
	}

	render( data ) {
		const posts = data.collections?.[ data.tag ] || [];
		const functions = data.functions;

		return /* html */ `
			<h1>Tagged “${ functions.escapeHtml( data.tag ) }”</h1>

			${ this.renderPostsList( posts, data.page?.url, functions ) }

			<p>See <a href="/tags/">all tags</a>.</p>
		`;
	}
}
