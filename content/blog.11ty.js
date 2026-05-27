export default class Blog {

	// Data
	data() {
		return {
			permalink: '/blog/',
			eleventyNavigation: {
				key: 'Archive',
				order: 2,
			},
		};
	}

	// Render
	render( data ) {

		this.fn = data.fn;

		return /* html */ `
			<h1>Archive</h1>

			${ this.renderPostsList( data.collections?.posts || [], data.page?.url ) }
		`;
	}

	/**
	 * Render one post link and date for the archive list.
	 */
	renderPostListItem( post, currentUrl ) {
		return /* html */ `
			<li class="postlist-item${ post.url === currentUrl ? ' postlist-item-active' : '' }">
				<a href="${ this.fn.escHtml( post.url ) }" class="postlist-link">${ post.data?.title ? this.fn.escHtml( post.data.title ) : /* html */ `<code>${ this.fn.escHtml( post.url ) }</code>` }</a>
				<time class="postlist-date" datetime="${ this.fn.escHtml( this.fn.dateToFormat( post.date, 'yyyy-LL-dd' ) ) }">${ this.fn.escHtml( this.fn.dateToFormat( post.date, 'LLLL yyyy' ) ) }</time>
			</li>
		`;
	}

	/**
	 * Render the archive list in post order.
	 */
	renderPostsList( posts, currentUrl ) {
		return /* html */ `
			<ol reversed class="postlist" style="--postlist-index: ${ posts.length + 1 }">
				${ posts.slice().reverse().map( ( post ) => this.renderPostListItem( post, currentUrl ) ).join( '' ) }
			</ol>
		`;
	}
}
