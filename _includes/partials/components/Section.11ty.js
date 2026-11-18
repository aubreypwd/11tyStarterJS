export default class Section {

	render( data, options = {} ) {

		options = {
			content: '',
			...options,
		};

		if ( 'string' !== typeof options.sectionName || '' === options.sectionName.trim() ) {
			throw new TypeError( 'options.sectionName must be a non-empty string.' );
		}

		if ( 'string' !== typeof options.content ) {
			throw new TypeError( 'options.content must be an HTML string.' );
		}

		return /* html */ `

			<${ options.sectionElement?.tag ?? 'section' } id="${ data.fn.escStringToDashes( options.sectionName ) }"
				class="
					Section
					Section__${ options.sectionName }
					Container
					Container--variation-${ options.containerVariation ?? 'default' }
					${ options.sectionName }
					${ options.sectionName }--variation-${ options.sectionVariation ?? 'default' }
					${ options.className ?? '' }
				">
					<${ options.contentElement?.tag ?? 'div' } class="
						Container__content
						Container__content--variation-${ options.contentVariation ?? 'default' }
						${ options.contentElement?.className ?? '' }
					">
						${ options.content }
					</${ options.contentElement?.tag ?? 'div' }>
			</${ options.sectionElement?.tag ?? 'section' }>
		`;
	}
}
