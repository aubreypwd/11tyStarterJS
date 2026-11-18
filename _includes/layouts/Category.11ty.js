export default class Category {

	data() {
		return {

			layout: 'layouts/Base.11ty.js',

			eleventyComputed: {

				title( data ) {

					if ( 'home' === data.Category?.layoutVariation ) {
						return `${ data.schema.localBusiness.name } ${ data.settings.titleSeparator } ${ data.schema.localBusiness.address.addressLocality }, ${ data.schema.localBusiness.address.addressRegion }`;
					}

					return `${ data.Category?.name ?? 'Unknown Category' } in ${ data.schema.localBusiness.address.addressLocality }, ${ data.schema.localBusiness.address.addressRegion } ${ data.settings.titleSeparator } ${ data.schema.localBusiness.name }`;
				},

				description( data ) {

					if ( 'undefined' === typeof data.description || ! data.description.length ) {
						throw new TypeError( 'No description set.' );
					}

					return data.description;
				}
			}
		};
	}

	render( data ) {

		if ( 'home' === data.Category?.layoutVariation ) {

			return /* html */ `

				${ data.partials.Hero.render( data, {
					...data.sections?.Hero,
					heading: data.sections?.Hero?.heading || data.Category?.name || 'Unknown Category',
				} ) }

				${ data.partials.About.render( data, data.sections?.About ?? {} ) }
				${ data.partials.Testimonials.render( data, data.sections?.Testimonials ?? {} ) }

				${ this.renderServicesSection( data, data.sections?.Services ?? {} ) }

				${ data.partials.Contact.render( data, data.sections?.Contact ?? {} ) }
				${ data.partials.ServiceAreas.render( data, data.sections?.ServiceAreas ?? {} ) }
			`;
		}

		return /* html */ `

			${ data.partials.Hero.render( data, {
				...data.sections?.Hero,
				heading: data.sections?.Hero?.heading || data.Category?.name || 'Unknown Category',
			} ) }

			${ this.renderServicesSection( data, data.sections?.Services ?? {} ) }

			${ data.partials.About.render( data, data.sections?.About ?? {} ) }
			${ data.partials.Testimonials.render( data, data.sections?.Testimonials ?? {} ) }
			${ data.partials.Contact.render( data, data.sections?.Contact ?? {} ) }
			${ data.partials.ServiceAreas.render( data, data.sections?.ServiceAreas ?? {} ) }
		`;
	}

	renderServicesSection( data, options ) {

		if ( false === options.render ) {
			return '';
		}

		return data.partials.Section.render( data, {
			sectionName: options.sectionName ?? 'Category__section',
			containerVariation: options.containerVariation ?? 'none',
			content: data.partials.Content.render( data, {
				contentVariation: options.contentVariation ?? 'category',
				renderMarkdown: options.renderMarkdown ?? false,
				content: this.renderServicesContent( data, options ),
			} ),
		} );
	}

	renderServicesContent( data, options ) {

		return /* html */ `

			${ data.partials.SectionHeader.render( data, {
				sectionName: 'Category',
				...options.sectionHeader,
			} ) }

			${ this.renderServices( data, options.items ?? [] ) }
		`;
	}

	renderServices( data, serviceItems ) {

		let markup = ``;

		for ( const service of serviceItems ) {

			const cta = data.partials.Link.render( data, {
				content: 'Learn More',
				umami: {
					event: data.events.bookNowCTA,
					location: 'Category Content',
					context: service.heading,
				},
				attributes: {
					href: service.url ?? '#contact',
					class: data.Category?.textOnlyServices
						? 'CTALink'
						: 'Button Button--variation-orange Button--thin',
				},
			} );

			if ( 'undefined' === typeof service.image ) {

				// No photo.
				markup += data.fn.markdown( `
					### ${ service.heading }

					${ service.content }
					${ cta }
			` );
			} else {

				// Photo.
				markup += data.partials.ContentPhoto.render( data, {
					image: service.image,
					alt: service.alt,
					reverse: service.reverse,
					content: `
						### ${ service.heading }

						${ service.content }

						${ cta }
					`,
				} );
			}
		}

		if ( data.Category?.textOnlyServices ) {

			return /* html */ `
				<div class="Content__apply">
					${ markup }
				</div>
			`;
		}

		return markup;
	}
}
