export default class Category {

	data() {
		return {

			layout: 'layouts/Base.11ty.js',

			eleventyComputed: {

				title( data ) {

					if ( 'home' === data.variation ) {
						return `${ data.schema.localBusiness.name } ${ data.settings.titleSeparator } ${ data.schema.localBusiness.address.addressLocality }, ${ data.schema.localBusiness.address.addressRegion }`;
					}

					// Category variation (default).
					return `${ data.category ?? 'Unknown Category' } in ${ data.schema.localBusiness.address.addressLocality }, ${ data.schema.localBusiness.address.addressRegion } ${ data.settings.titleSeparator } ${ data.schema.localBusiness.name }`;
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

		if ( 'home' === data.variation ) {

			return /* html */ `

				<!-- Hero -->
				${ data.partials.Hero.render( data, this, data.Hero ) }

				${ data.partials.About.render( data, this, {} ) } <!-- Required -->
				${ data.partials.Testimonials.render( data, this, {} ) }

				<!-- Services -->
				${ data.partials.Section.render( data, this, { name: data.sectionName ?? 'Category__section', containerVariation: 'none' }, data.partials.Content.render( data, this, { variation: 'category', markdownIfy: false }, this.renderCategoryContent( data ) ) ) }

				<!-- Other Sections -->
				${ data.partials.Contact.render( data, this, {} ) } <!-- Required -->
				${ data.partials.ServiceAreas.render( data, this, {} ) }
			`;
		}

		return /* html */ `

			<!-- Hero -->
			${ data.partials.Hero.render( data, this, data.Hero ) }

			<!-- Services -->
			${ data.partials.Section.render( data, this, { name: data.sectionName ?? 'Category__section', containerVariation: 'none' }, data.partials.Content.render( data, this, { variation: 'category', markdownIfy: false }, this.renderCategoryContent( data ) ) ) }

			<!-- Other Sections -->
			${ data.partials.About.render( data, this, {} ) } <!-- Required -->
			${ data.partials.Testimonials.render( data, this, {} ) }
			${ data.partials.Contact.render( data, this, {} ) } <!-- Required -->
			${ data.partials.ServiceAreas.render( data, this, {} ) }
		`;
	}

	renderCategoryContent( data ) {

		return /* html */ `

			${ data.partials.SectionHeader.render( data, this, data.header ) }

			${ this.renderServices( data ) }
		`;
	}

	renderServices( data ) {

		let markup = ``;

		for ( const service of data.services ) {

			const cta = data.partials.Link.render( data, this, {
				content: 'Learn More',
				umami: {
					event: data.events.bookNowCTA,
					location: 'Category Content',
					context: service.header,
				},
				attributes: {
					href: service.permalink ?? '#contact',
					class: data.Category?.noImages
						? 'CTALink'
						: 'Button Button--variation-orange Button--thin',
				}
			} );

			if ( 'undefined' === typeof service.src ) {

				// No photo.
				markup += data.fn.markdown( `
					### ${ service.header }

					${ service.content }
					${ cta }
				` );
			} else {

				// Photo.
				markup += data.partials.ContentPhoto.render( data, this, {
					src: service.src,
					alt: service.alt,
					reverse: service.reverse,
					content: `
						### ${ service.header }

						${ service.content }

						${ cta }
					`,
				} );
			}
		}

		if ( data.Category?.noImages ) {

			return /* html */ `
				<div class="Content__apply">
					${ markup }
				</div>
			`;
		}

		return markup;
	}
}
