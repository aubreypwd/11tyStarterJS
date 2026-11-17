export default class Page {

	data() {

		return {
			layout: 'layouts/Base.11ty.js',

			eleventyComputed: {

				title( data ) {
					return `${ data.title } ${ data.settings.titleSeparator } ${ data.schema.localBusiness.name } in ${ data.schema.localBusiness.address.addressLocality }, ${ data.schema.localBusiness.address.addressRegion }`;
				},

				Hero( data ) {

					return {

						// @TODO: Why do I have to do this?
						heading: data.Hero?.heading || data.title.replace( ` ${ data.settings.titleSeparator } ${ data.schema.localBusiness.name } in ${ data.schema.localBusiness.address.addressLocality }, ${ data.schema.localBusiness.address.addressRegion }`, '' ),
						subHeading: data.heroSubHeading ?? '',

						description: data.heroDescription ?? data.description,

						renderWith: data.Hero?.renderWith || false,
						renderLocation: data.Hero?.renderLocation || false,
						renderCtas: data.Hero?.renderCtas || false,
						variation: data.Hero?.variation || 'default',
					};
				}
			}
		};
	}

	render( data ) {

		// Normal pages.
		return /* html */ `

			${ data.partials.Hero.render( data, this, data.Hero ) }

			<!-- Content -->
			${ data.partials.Section.render( data, this, { name: 'Page__content', containerVariation: 'page' }, data.partials.Content.render( data, this, data.Page?.Content ?? {}, data.content, data.aside || false ) ) }

			${ false === data.About?.render ? '' : data.partials.About.render( data, this, data.About ?? {} ) }
			${ false === data.Testimonials?.render ? '' : data.partials.Testimonials.render( data, this, data.Testimonials ?? {} ) }
			${ false === data.Contact?.render ? '' : data.partials.Contact.render( data, this, data.Contact ?? {} ) }
		`;
	}
}
