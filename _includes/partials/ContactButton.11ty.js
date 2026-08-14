/**
 * Renders the contact call-to-action button.
 *
 * @since August 13, 2026
 */
export default class ContactButton {

	/**
	 * Renders a contact button.
	 *
	 * @since August 13, 2026
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @param {string} text Button text.
	 * @return {string} Contact button HTML.
	 */
	render( data, context, text = 'Contact Us' ) {
		return /* html */ `<a href="#contact" class="ContactButton Button Button--primary">${ data.fn.escHtml( text ) }</a>`;
	}
}
