/**
 * Renders individual tag archive pages.
 *
 * @since Unknown
 */
export default class TagPages {

	/**
	 * Provides paginated tag archive data.
	 *
	 * @since Unknown
	 *
	 * @return {object} Tag page data.
	 */
	data() {
		return {
			layout: 'layouts/Page.11ty.js',

			pagination: {

				// Page through Eleventy's collections object one tag at a time.
				data: 'collections',
				size: 1,
				alias: 'tag',
				filter: [ 'all', 'posts' ],
			},

			eleventyExcludeFromCollections: true,
			eleventyComputed: {

				/**
				 * Builds the tag archive title.
				 *
				 * @since Unknown
				 *
				 * @param {object} data Eleventy data cascade.
				 * @return {string} Tag archive title.
				 */
				title( data ) {
					return `Tagged '${ data.tag }'`;
				},

				/**
				 * Builds the tag archive permalink.
				 *
				 * @since Unknown
				 *
				 * @param {object} data Eleventy data cascade.
				 * @return {string} Tag archive permalink.
				 */
				permalink: function( data ) {

					// If DuplicatePermalinkOutputError occurs, check that no tag occurs with differing case, e.g. "RSS" and "rss".
					return `/tags/${ this.slugify( data.tag ) }/`;
				},
			},
		};
	}

	/**
	 * Renders a tag archive page.
	 *
	 * @since Unknown
	 *
	 * @param {object} data Eleventy data cascade.
	 * @return {string} Tag archive HTML.
	 */
	render( data ) {

		return /* html */ `
			<h1>Tagged “${ data.fn.escHtml( data.tag ) }”</h1>

			${ this.renderPostsList( data, data.collections?.[ data.tag ] || [], data.page?.url ) }

			<p>See <a href="/tags/">all tags</a>.</p>
		`;
	}

	/**
	 * Render one tagged post in the list.
	 *
	 * @since Unknown
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} post Post record.
	 * @param {string} currentUrl Current page URL.
	 * @return {string} Post-list item HTML.
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
	 * Render the tagged posts newest-first.
	 *
	 * @since Unknown
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {array} posts Post records.
	 * @param {string} currentUrl Current page URL.
	 * @return {string} Post-list HTML.
	 */
	renderPostsList( data, posts, currentUrl ) {
		return /* html */ `
			<ol reversed class="PostList" style="--postlist-index: ${ posts.length + 1 }">
				${ posts.slice().reverse().map( ( post ) => this.renderPostListItem( data, post, currentUrl ) ).join( '' ) }
			</ol>
		`;
	}
}
