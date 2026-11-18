export default class LogoMark {

	static styles = {
		10: 'css/partials/components/LogoMark.css',
	};

	render( data, options = {} ) {

		options = {
			variation: 'default',
			...options,
		};

		return /* html */ `
			<a href="/" title="Home" class="LogoMark" aria-label="${ data.fn.escHtml( data.schema.localBusiness.name ) } home">
				<img
					alt="${ data.fn.escHtml( data.schema.localBusiness.name ) }"
					class="LogoMark__image"
					decoding="async"
					height="100"
					src="${ 'alternate' === options.variation
						? 'https://placehold.co/320x100/f5f9ff/173d69?text=Northline+%26+Co.'
						: 'https://placehold.co/320x100/173d69/f5f9ff?text=Northline+%26+Co.'
					}"
					width="320"
					eleventy:ignore>
			</a>
		`;
	}
}
