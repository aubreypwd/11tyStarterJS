export default class Content {

	static styles = {
		10: 'css/partials/components/Content.css',
	};

	render( data, options = {} ) {

		options = {
			content: '',
			aside: false,
			asideVariation: 'default',
			renderMarkdown: true,
			contentVariation: 'default',
			...options,
		};

		return /* html */ `

			<div class="Container Content Content--variation-${ options.contentVariation } SansSerif SansSerif--regular ${ 'string' === typeof options.aside ? `Content--has-aside` : `` }">
				<article class="Content__container-content">

					<div class="Content__apply">
						${ options.renderMarkdown ? data.fn.markdown( options.content ) : options.content }
					</div>

					${ this.renderAside( options ) }
				</article>
			</div>
		`;
	}

	renderAside( options ) {

		if ( 'string' !== typeof options.aside ) {
			return ``; // No aside.
		}

		return /* html */ `
			<aside class="Content__aside Content__aside--variation-${ options.asideVariation }">
				${ options.aside }
			</aside>
		`;
	}
}
