/**
 * Renders the site's 404 page.
 *
 * @since August 13, 2026
 */
export default class NotFound {

	/**
	 * Provides 404 page data.
	 *
	 * @since August 13, 2026
	 *
	 * @return {object} 404 page data.
	 */

	data() {
		return {
			layout: 'layouts/Page.11ty.js',
			permalink: '404.html',
			eleventyExcludeFromCollections: true,
			title: 'Page not found',
		};
	}

	/**
	 * Renders the 404 page.
	 *
	 * @since August 13, 2026
	 *
	 * @return {string} 404 page HTML.
	 */
	render() {
		return /* html */ `
			<h1>Content not found.</h1>
			<p>That page is not here. Go <a href="/">home</a>.</p>
		`;
	}
}
