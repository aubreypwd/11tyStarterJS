/**
 * Renders the starter logo mark.
 *
 * @since August 13, 2026
 */
export default class LogoMark {

	/**
	 * CSS file paths keyed by numeric load priority.
	 *
	 * @since August 13, 2026
	 *
	 * @type {object}
	 */
	static styles = {
		10: 'css/partials/LogoMark.css',
	};

	/**
	 * Renders the logo link.
	 *
	 * @since August 13, 2026
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @return {string} Logo HTML.
	 */
	render( data, context = this ) {

		return /* html */ `

			<a href="/" class="LogoMark" aria-label="${ data.fn.escHtml( data.schema.localBusiness.name ) } home">
				<div class="LogoMark__wordmark">11ty</div>
				<div class="LogoMark__descriptor">Starter JS</div>
			</a>
		`;
	}
}
