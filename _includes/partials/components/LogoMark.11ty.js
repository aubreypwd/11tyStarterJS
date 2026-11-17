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
		10: 'css/partials/components/LogoMark.css',
	};

	/**
	 * Renders the logo link.
	 *
	 * @since August 13, 2026
	 * @since September 15, 2026 Adds explicit Flex classes.
	 * @since October 27, 2026 Moves layout into the component stylesheet.
	 * @since October 29, 2026 Accepts a render options object.
	 * @since November 17, 2026 Uses placehold.co logo variants.
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @param {object} options Render options.
	 * @return {string} Logo HTML.
	 */
	render( data, context = this, options = {} ) {

		return /* html */ `
			<a href="/" title="Home" class="LogoMark" aria-label="${ data.fn.escHtml( data.schema.localBusiness.name ) } home">
				<img class="LogoMark__image" src="https://placehold.co/320x100/${ 'alternate' === options.variation ? 'f5f9ff/173d69' : '173d69/f5f9ff' }?text=Northline+%26+Co." alt="${ data.fn.escHtml( data.schema.localBusiness.name ) }" width="320" height="100" decoding="async" eleventy:ignore>
			</a>
		`;
	}
}
