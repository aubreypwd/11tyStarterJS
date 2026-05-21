export default class Blog {
	data() {
		return {
			permalink: '/blog/',
			eleventyNavigation: {
				key: 'Archive',
				order: 2,
			},
		};
	}

	/**
	 * Render one post link and date for the archive list.
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
	 * Render the archive list in post order.
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
			<h1>Archive</h1>

			${ this.renderPostsList( data.collections?.posts || [], data.page?.url, data.fn ) }
		`;
	}
}
