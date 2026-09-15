/**
 * Renders the blog archive page.
 *
 * @since Unknown
 */
export default class Blog {

	/**
	 * Provides blog archive data.
	 *
	 * @since Unknown
	 *
	 * @return {object} Blog archive data.
	 */
	data() {
		return {
			layout: 'layouts/Page.11ty.js',
			permalink: '/blog/',
			title: 'Blog',
			eleventyNavigation: {
				key: 'Blog',
				title: 'Blog',
				order: 3,
			},
		};
	}

	/**
	 * Renders the blog archive.
	 *
	 * @since Unknown
	 *
	 * @param {object} data Eleventy data cascade.
	 * @return {string} Blog archive HTML.
	 */
	render( data ) {

		return /* html */ `
			<h1>Archive</h1>

			${ this.renderPostsList( data, data.collections?.posts || [], data.page?.url ) }
		`;
	}

	/**
	 * Render one post link and date for the archive list.
	 *
	 * @since Unknown
	 * @since September 15, 2026 Adds explicit Flex classes.
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} post Post record.
	 * @param {string} currentUrl Current post URL.
	 * @return {string} Post-list item HTML.
	 */
	renderPostListItem( data, post, currentUrl ) {
		return /* html */ `
			<li class="PostList__item Flex Flex--0-row-items-baseline Flex--0-wrap${ post.url === currentUrl ? ' PostList__item--active' : '' }">
				<a href="${ data.fn.escHtml( post.url ) }" class="PostList__link">${ post.data?.title ? data.fn.escHtml( post.data.title ) : /* html */ `<code>${ data.fn.escHtml( post.url ) }</code>` }</a>
				<time class="PostList__date" datetime="${ data.fn.escHtml( data.fn.dateToFormat( post.date, 'yyyy-LL-dd' ) ) }">${ data.fn.escHtml( data.fn.dateToFormat( post.date, 'LLLL yyyy' ) ) }</time>
			</li>
		`;
	}

	/**
	 * Render the archive list in post order.
	 *
	 * @since Unknown
	 * @since September 15, 2026 Adds explicit Flex classes.
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {array} posts Post records.
	 * @param {string} currentUrl Current page URL.
	 * @return {string} Post-list HTML.
	 */
	renderPostsList( data, posts, currentUrl ) {
		return /* html */ `
			<ol reversed class="PostList Flex Flex--0-column" style="--postlist-index: ${ posts.length + 1 }">
				${ posts.slice().reverse().map( ( post ) => this.renderPostListItem( data, post, currentUrl ) ).join( '' ) }
			</ol>
		`;
	}
}
