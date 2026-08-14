/**
 * Renders the homepage.
 *
 * @since August 13, 2026
 */
export default class Index {

	/**
	 * Provides homepage data.
	 *
	 * @since August 13, 2026
	 *
	 * @return {object} Homepage data.
	 */
	data() {
		return {
			permalink: '/',
			layout: 'layouts/Page.11ty.js',
			title: 'Local Business',
			eleventyNavigation: {
				key: 'Home',
				title: 'Home',
				order: 1,
			},
		};
	}

	/**
	 * Renders the minimal starter homepage.
	 *
	 * @since August 13, 2026
	 *
	 * @param {object} data Eleventy data cascade.
	 * @return {string} Homepage HTML.
	 */
	render( data ) {
		return /* html */ `
			<h1>${ data.fn.escHtml( data.schema.localBusiness.name ) }</h1>
			<p>A minimal Eleventy starter for a local business website. Replace this content with the site's homepage.</p>
		`;
	}

	/**
	 * Renders the latest posts block.
	 *
	 * @since August 13, 2026
	 *
	 * @param {object} data Eleventy data cascade.
	 * @return {string} Latest-posts HTML.
	 */
	renderPosts( data ) {
		const postsToShow = data.numberOfLatestPostsToShow || 3;
		const postsCount = ( data.collections?.posts || [] ).length;
		const latestPostsCount = Math.min( postsCount, postsToShow );
		const morePosts = postsCount - postsToShow;

		return /* html */ `

			<h1>Latest ${ latestPostsCount } Post${ latestPostsCount === 1 ? '' : 's' }</h1>

			${ this.renderPostsList( data, ( data.collections?.posts || [] ).slice( -postsToShow ).reverse(), postsCount, data.page?.url ) }

			${ morePosts > 0 ? /* html */ `<p>${ morePosts } more post${ morePosts === 1 ? '' : 's' } can be found in <a href="/blog/">the archive</a>.</p>` : '' }
		`;
	}

	/**
	 * Renders one post link and date for a post list.
	 *
	 * @since August 13, 2026
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} post Post record.
	 * @param {string} currentUrl Current URL.
	 * @return {string} Rendered post-list item.
	 */
	renderPostListItem( data, post, currentUrl ) {
		return /* html */ `
			<li class="PostList__item${ post.url === currentUrl ? ' PostList__item--active' : '' }">
				<a href="${ data.fn.escHtml( post.url ) }" class="PostList__link">${ post.data?.title ? data.fn.escHtml( post.data.title ) : /* html */ `<code>${ data.fn.escHtml( post.url ) }</code>` }</a>
				<time class="PostList__date" datetime="${ data.fn.escHtml( data.fn.dateToFormat( post.date, 'yyyy-LL-dd' ) ) }">${ data.fn.escHtml( data.fn.dateToFormat( post.date, 'LLLL yyyy' ) ) }</time>
			</li>
		`;
	}

	/**
	 * Renders the ordered list of latest posts.
	 *
	 * @since August 13, 2026
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {array} posts Posts to display.
	 * @param {number} postsCount Total post count.
	 * @param {string} currentUrl Current URL.
	 * @return {string} Post-list HTML.
	 */
	renderPostsList( data, posts, postsCount, currentUrl ) {
		return /* html */ `
			<ol reversed class="PostList" style="--postlist-index: ${ postsCount + 1 }">
				${ posts.map( ( post ) => this.renderPostListItem( data, post, currentUrl ) ).join( '' ) }
			</ol>
		`;
	}
}
