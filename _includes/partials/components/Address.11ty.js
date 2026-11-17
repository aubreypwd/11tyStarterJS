/**
 * Renders the business address and contact details.
 *
 * @since Unknown
 */
export default class Address {

	/**
	 * CSS file paths keyed by numeric load priority.
	 *
	 * @since August 13, 2026
	 *
	 * @type {object}
	 */
	static styles = {
		10: 'css/partials/components/Address.css',
	};

	/**
	 * Renders the address block.
	 *
	 * @since Unknown
	 * @since September 15, 2026 Adds explicit Flex classes.
	 * @since October 27, 2026 Moves layout into the component stylesheet.
	 * @since October 29, 2026 Accepts a render options object.
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @param {object} options Render options.
	 * @return {string} Address HTML.
	 */
	render( data, context, options = {} ) {

		return /* html */ `
			<address class="Address">
				<p><strong class="Address__name">${ data.fn.escHtml( data.schema.localBusiness.name ) }</strong></p>
				<p>${ data.fn.escHtml( data.schema.localBusiness.address.streetAddress ) }</p>
				<p>${ data.fn.escHtml( data.schema.localBusiness.address.addressLocality ) }, ${ data.fn.escHtml( data.schema.localBusiness.address.addressRegion ) } ${ data.fn.escHtml( data.schema.localBusiness.address.postalCode ) }</p>
			</address>

			<p class="Address__contact">
				<span><a class="Address__link" title="Call Us" href="#">${ data.fn.escHtml( data.fn.formatPhone( data.schema.localBusiness.telephone ) ) }</a></span>
				<span><a class="Address__link" title="Email Us" href="#">${ data.schema.localBusiness.email }</a></span>
			</p>
		`;
	}
}
