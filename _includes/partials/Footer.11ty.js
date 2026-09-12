/**
 * Renders the site footer.
 *
 * @since August 13, 2026
 */
export default class Footer {

	/**
	 * CSS file paths keyed by numeric load priority.
	 *
	 * @since August 13, 2026
	 *
	 * @type {object}
	 */
	static styles = {
		10: 'scss/partials/Footer.scss',
	};

	/**
	 * Renders the site footer copyright notice.
	 *
	 * @since August 13, 2026
	 * @since August 13, 2026 Renders only the copyright notice.
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @return {string} Footer HTML.
	 */
	render( data, context = this ) {

		return /* html */ `
			<footer class="SiteFooter">
				<p class="SiteFooter__copyright">&copy; ${ data.fn.dateToFormat( new Date(), 'yyyy' ) } ${ data.fn.escHtml( data.schema.localBusiness.name ) }. All rights reserved.</p>
			</footer>
		`;
	}
}
