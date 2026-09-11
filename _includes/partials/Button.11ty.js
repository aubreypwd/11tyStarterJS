import { JSDOM } from 'jsdom';

/**
 * Renders a reusable button.
 *
 * @since September 11, 2026
 */
export default class Button {

	/**
	 * Renders a button element with arbitrary attributes.
	 *
	 * @since September 11, 2026
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @param {string} content Button HTML content.
	 * @param {object} attributes Button attributes.
	 * @return {string} Serialized button HTML.
	 */
	render( data, context, content, attributes = {} ) {

		if ( null === attributes || 'object' !== typeof attributes || Array.isArray( attributes ) ) {
			throw new TypeError( `attributes must be an object.` );
		}

		if ( 'string' !== typeof attributes.type ) {
			throw new TypeError( `attributes.type must be a string.` );
		}

		if ( 'string' !== typeof content ) {
			throw new TypeError( `content must be a string.` );
		}

		const element = new JSDOM().window.document.createElement( 'button' );

		for ( const [ name, value ] of Object.entries( attributes ) ) {
			element.setAttribute( name, value );
		}

		element.innerHTML = content;

		return element.outerHTML;
	}
}
