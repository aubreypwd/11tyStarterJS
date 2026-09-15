/**
 * Renders the tag archive page.
 *
 * @since Unknown
 */
export default class Tags {

	/**
	 * Provides tag archive data.
	 *
	 * @since Unknown
	 *
	 * @return {object} Tag archive data.
	 */
	data() {
		return {
			layout: 'layouts/Page.11ty.js',
			permalink: '/tags/',
		};
	}

	/**
	 * Renders the tag archive.
	 *
	 * @since Unknown
	 *
	 * @param {object} data Eleventy data cascade.
	 * @return {string} Tag archive HTML.
	 */
	render( data ) {

		return /* html */ `
			<h1>Tags</h1>

			<ul>
				${
					// Start with every collection name, remove Eleventy's built-in buckets, and sort the rest.
					data.fn.filterTagList( Object.keys( data.collections || {} ) )
						.sort( ( a, b ) => b.localeCompare( a ) )
						.map( ( tag ) => this.renderTagListItem( data, tag ) )
						.join( '' )
				}
			</ul>
		`;
	}

	/**
	 * Turn one tag into a link to its tag archive page.
	 *
	 * @since Unknown
	 * @since September 15, 2026 Adds explicit Flex classes.
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {string} tag Tag name.
	 * @return {string} Tag link HTML.
	 */
	renderTagListItem( data, tag ) {
		return /* html */ `<li><a href="${ data.fn.escHtml( `/tags/${ this.slugify( tag ) }/` ) }" class="PostTag Flex Flex--inline Flex--0-row-horizontal-center Flex--0-row-items-center">${ data.fn.escHtml( tag ) }</a></li>`;
	}
}
