export default class TagPages {
	data() {
		return {
			pagination: {
				// Page through Eleventy’s collections object one tag at a time.
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

	/**
	 * Render one tagged post in the list.
	 */
	renderPostListItem( post, currentUrl, fn ) {
		return /* html */ `
			<li class="postlist-item${ post.url === currentUrl ? ' postlist-item-active' : '' }">
				<a href="${ fn.escHtml( post.url ) }" class="postlist-link">${ post.data?.title ? fn.escHtml( post.data.title ) : /* html */ `<code>${ fn.escHtml( post.url ) }</code>` }</a>
				<time class="postlist-date" datetime="${ fn.escHtml( fn.dateToFormat( post.date, 'yyyy-LL-dd' ) ) }">${ fn.escHtml( fn.dateToFormat( post.date, 'LLLL yyyy' ) ) }</time>
			</li>
		`;
	}

	/**
	 * Render the tagged posts newest-first.
	 */
	renderPostsList( posts, currentUrl, fn ) {
		return /* html */ `
			<ol reversed class="postlist" style="--postlist-index: ${ posts.length + 1 }">
				${ posts.slice().reverse().map( ( post ) => this.renderPostListItem( post, currentUrl, fn ) ).join( '' ) }
			</ol>
		`;
	}

	render( data ) {
		return /* html */ `
			<h1>Tagged “${ data.fn.escHtml( data.tag ) }”</h1>

			${ this.renderPostsList( data.collections?.[ data.tag ] || [], data.page?.url, data.fn ) }

			<p>See <a href="/tags/">all tags</a>.</p>
		`;
	}
}
