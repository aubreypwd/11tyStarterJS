export default class Content {

	static styles = {
		10: 'css/partials/components/Content.css',
	};

	render( data, context, options = {}, content, aside ) {

		options = {
			markdownIfy: true,
			variation: 'default',
			...options,
		};

		return /* html */ `

			<div class="Container Content Content--variation-${ options.variation } SansSerif SansSerif--regular ${ 'string' === typeof aside ? `Content--has-aside` : `` }">
				<article class="Content__container-content">

					<div class="Content__apply">
						${ options.markdownIfy ? data.fn.markdown( content ) : content }
					</div>

					${ this.maybeRenderAside( data, aside ) }
				</article>
			</div>
		`;
	}

	maybeRenderAside( data, aside ) {

		if ( 'string' !== typeof aside ) {
			return ``; // No aside.
		}

		return /* html */ `
			<aside class="Content__aside Content__aside--variation-${ data.Content__aside?.variation ?? 'default' }">
				${ aside }
			</aside>
		`;
	}
}
