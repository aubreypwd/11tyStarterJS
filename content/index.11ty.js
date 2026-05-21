export default class Index {
	data() {
		return {
			permalink: '/',
			eleventyNavigation: {
				key: 'Home',
				order: 1,
			},
			numberOfLatestPostsToShow: 3,
		};
	}

	/**
	 * Render one post link and date for a post list.
	 */
	renderPostListItem( post, currentUrl, functions ) {
		return /* html */ `
			<li class="postlist-item${ post.url === currentUrl ? ' postlist-item-active' : '' }">
				<a href="${ functions.escapeHtml( post.url ) }" class="postlist-link">${ post.data?.title ? functions.escapeHtml( post.data.title ) : /* html */ `<code>${ functions.escapeHtml( post.url ) }</code>` }</a>
				<time class="postlist-date" datetime="${ functions.escapeHtml( functions.dateToFormat( post.date, 'yyyy-LL-dd' ) ) }">${ functions.escapeHtml( functions.dateToFormat( post.date, 'LLLL yyyy' ) ) }</time>
			</li>
		`;
	}

	/**
	 * Render the ordered list of latest posts.
	 */
	renderPostsList( posts, postsCount, currentUrl, functions ) {
		return /* html */ `
			<ol reversed class="postlist" style="--postlist-index: ${ postsCount + 1 }">
				${ posts.map( ( post ) => this.renderPostListItem( post, currentUrl, functions ) ).join( '' ) }
			</ol>
		`;
	}

	render( data ) {
		const postsToShow = data.numberOfLatestPostsToShow || 3;
		const postsCount = ( data.collections?.posts || [] ).length;
		const latestPostsCount = Math.min( postsCount, postsToShow );
		const morePosts = postsCount - postsToShow;

		return /* html */ `
			<h1>Latest ${ latestPostsCount } Post${ latestPostsCount === 1 ? '' : 's' }</h1>

			${ this.renderPostsList( ( data.collections?.posts || [] ).slice( -postsToShow ).reverse(), postsCount, data.page?.url, data.functions ) }

			${ morePosts > 0 ? /* html */ `
				<p>${ morePosts } more post${ morePosts === 1 ? '' : 's' } can be found in <a href="/blog/">the archive</a>.</p>
			` : '' }
		`;
	}
}
