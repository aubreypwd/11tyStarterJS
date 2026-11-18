export default class Address {

	static styles = {
		10: 'css/partials/components/Address.css',
	};

	render( data ) {

		return /* html */ `
			<address class="Address">
				<p><strong class="Address__name">${ data.fn.escHtml( data.schema.localBusiness.name ) }</strong></p>
				<p>${ data.fn.escHtml( data.schema.localBusiness.address.streetAddress ) }</p>
				<p>${ data.fn.escHtml( data.schema.localBusiness.address.addressLocality ) }, ${ data.fn.escHtml( data.schema.localBusiness.address.addressRegion ) } ${ data.fn.escHtml( data.schema.localBusiness.address.postalCode ) }</p>
			</address>

			<p class="Address__contact">
				<span><a class="Address__link" title="Call Us" href="tel:${ data.fn.escHtml( data.schema.localBusiness.telephone ) }">${ data.fn.escHtml( data.fn.formatPhone( data.schema.localBusiness.telephone ) ) }</a></span>
				<span><a class="Address__link" title="Email Us" href="mailto:${ data.fn.escHtml( data.schema.localBusiness.email ) }">${ data.fn.escHtml( data.schema.localBusiness.email ) }</a></span>
			</p>
		`;
	}
}
