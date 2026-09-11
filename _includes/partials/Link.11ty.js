import { JSDOM } from 'jsdom';

/**
 * Renders a reusable link.
 *
 * @since September 11, 2026
 */
export default class Link {

	/**
	 * Renders an anchor element with arbitrary attributes.
	 *
	 * @since September 11, 2026
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @param {string} content Link HTML content.
	 * @param {object} attributes Link attributes.
	 * @return {string} Serialized link HTML.
	 */
	render( data, context, content, attributes = {} ) {

		if ( null === attributes || 'object' !== typeof attributes || Array.isArray( attributes ) ) {
			throw new TypeError( `attributes must be an object.` );
		}

		if ( 'string' !== typeof attributes.href ) {
			throw new TypeError( `attributes.href must be a string.` );
		}

		if ( 'string' !== typeof content ) {
			throw new TypeError( `content must be a string.` );
		}

		const element = new JSDOM().window.document.createElement( 'a' );

		for ( const [ name, value ] of Object.entries( attributes ) ) {
			element.setAttribute( name, value );
		}

		element.innerHTML = content;

		return element.outerHTML;
	}
}
