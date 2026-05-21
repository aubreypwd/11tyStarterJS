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
	renderPostListItem( post, currentUrl, fn ) {
		return /* html */ `
			<li class="postlist-item${ post.url === currentUrl ? ' postlist-item-active' : '' }">
				<a href="${ fn.escHtml( post.url ) }" class="postlist-link">${ post.data?.title ? fn.escHtml( post.data.title ) : /* html */ `<code>${ fn.escHtml( post.url ) }</code>` }</a>
				<time class="postlist-date" datetime="${ fn.escHtml( fn.dateToFormat( post.date, 'yyyy-LL-dd' ) ) }">${ fn.escHtml( fn.dateToFormat( post.date, 'LLLL yyyy' ) ) }</time>
			</li>
		`;
	}

	/**
	 * Render the ordered list of latest posts.
	 */
	renderPostsList( posts, postsCount, currentUrl, fn ) {
		return /* html */ `
			<ol reversed class="postlist" style="--postlist-index: ${ postsCount + 1 }">
				${ posts.map( ( post ) => this.renderPostListItem( post, currentUrl, fn ) ).join( '' ) }
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

			${ this.renderPostsList( ( data.collections?.posts || [] ).slice( -postsToShow ).reverse(), postsCount, data.page?.url, data.fn ) }

			${ morePosts > 0 ? /* html */ `
				<p>${ morePosts } more post${ morePosts === 1 ? '' : 's' } can be found in <a href="/blog/">the archive</a>.</p>
			` : '' }
		`;
	}
}
