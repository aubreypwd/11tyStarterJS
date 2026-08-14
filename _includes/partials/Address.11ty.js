/**
 * Renders the business address and contact details.
 *
 * @since Unknown
 */
export default class Address {

	/**
	 * Renders the address block.
	 *
	 * @since Unknown
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @return {string} Address HTML.
	 */
	render( data, context ) {

		return /* html */ `
			<address class="Address">
				<strong class="Address__name">${ data.fn.escHtml( data.schema.localBusiness.name ) }</strong><br>
				${ data.fn.escHtml( data.schema.localBusiness.address.streetAddress ) }<br>
				${ data.fn.escHtml( data.schema.localBusiness.address.addressLocality ) }, ${ data.fn.escHtml( data.schema.localBusiness.address.addressRegion ) } ${ data.fn.escHtml( data.schema.localBusiness.address.postalCode ) }
			</address>

			<p class="Address__contact">
				<a class="Address__link" title="Call Us" href="tel:${ data.fn.escHtml( data.schema.localBusiness.telephone ) }">${ data.fn.escHtml( data.fn.formatPhone( data.schema.localBusiness.telephone ) ) }</a><br>
				<a class="Address__link" title="Email Us" href="mailto:${ data.schema.localBusiness.email }">${ data.schema.localBusiness.email }</a>
			</p>
		`;
	}
}
