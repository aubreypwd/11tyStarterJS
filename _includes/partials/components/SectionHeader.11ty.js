export default class SectionHeader {

	static styles = {
		10: 'css/partials/components/SectionHeader.css',
	};

	render( data, context, options = {} ) {

		options = {
			name: 'SectionHeader',
			description: false,
			eyebrow: false,
			...options,
		};

		return /* html */ `

			<header class="
				SectionHeader
				${ data.fn.escHtml( options.name ) }__header
				${ data.fn.escHtml( options.class ?? '' ) }">

					${ this.maybeRenderEyebrow( data, options ) }

					<${ options.tag ?? 'h2' } class="
						SectionHeader__heading
						${ data.fn.escHtml( options.name ) }__heading
						${ data.fn.escHtml( options.headingClass ?? '' ) }">
							${ data.fn.escHtml( options.content ) }
					</${ options.tag ?? 'h2' }>

					${ this.maybeRenderDescription( data, options ) }
			</header>
		`;
	}

	maybeRenderDescription( data, options ) {

		if ( 'string' !== typeof options.description || '' === options.description.trim() ) {
			return ``;
		}

		return /* html */ `
			<div class="SectionHeader__description SansSerif SansSerif--regular">
				${ data.fn.markdown( options.description ) }
			</div>
		`;
	}

	maybeRenderEyebrow( data, options ) {

		if ( 'string' !== typeof options.eyebrow || '' === options.eyebrow.trim() ) {
			return ``;
		}

		return /* html */ `
			<${ options.eyebrowTag ?? 'span' } class="
				SectionHeader__eyebrow
				${ data.fn.escHtml( options.name ) }__eyebrow
				eyebrow
			">
				${ data.fn.escHtml( options.eyebrow ) }
			</${ options.eyebrowTag ?? 'span' }>
		`;
	}
}
