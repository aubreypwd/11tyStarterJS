export default class Section {

	render( data, context, options = {}, content = '' ) {

		if ( 'string' !== typeof options.name || '' === options.name.trim() ) {
			throw new TypeError( 'options.name must be a non-empty string.' );
		}

		if ( 'string' !== typeof content ) {
			throw new TypeError( `content must be an HTML string.` );
		}

		return /* html */ `

			<${ options.section?.tag ?? 'section' } id="${ data.fn.escStringToDashes( options.name ) }"
				class="
					Section
					Section__${ options.name }
					Container
					Container--variation-${ options.containerVariation ?? 'default' }
					${ options.name }
					${ options.name }--variation-${ options.variation ?? 'default' }
					${ options.class ?? '' }
				">
					<${ options.content?.tag ? options.content.tag : 'div' } class="
						Container__content
						Container__content--variation-${ options.contentVariation ?? 'default' }
						${ options.content?.class ?? '' }
					">
						${ content }
					</${ options.content?.tag ? options.content.tag : 'div' }>
			</${ options.section?.tag ?? 'section' }>
		`;
	}
}
