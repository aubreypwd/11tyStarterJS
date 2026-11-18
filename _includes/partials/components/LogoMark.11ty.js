export default class LogoMark {

	static styles = {
		10: 'css/partials/components/LogoMark.css',
	};

	render( data, context = this, options = {} ) {

		return /* html */ `
			<a href="/" title="Home" class="LogoMark" aria-label="${ data.fn.escHtml( data.schema.localBusiness.name ) } home">
				<img class="LogoMark__image" src="https://placehold.co/320x100/${ 'alternate' === options.variation ? 'f5f9ff/173d69' : '173d69/f5f9ff' }?text=Northline+%26+Co." alt="${ data.fn.escHtml( data.schema.localBusiness.name ) }" width="320" height="100" decoding="async" eleventy:ignore>
			</a>
		`;
	}
}
