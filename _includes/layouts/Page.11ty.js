export default class Page {

	data() {

		return {
			layout: 'layouts/Base.11ty.js',

			eleventyComputed: {

				title( data ) {
					return `${ data.title } ${ data.settings.titleSeparator } ${ data.schema.localBusiness.name } in ${ data.schema.localBusiness.address.addressLocality }, ${ data.schema.localBusiness.address.addressRegion }`;
				},
			},
		};
	}

	render( data ) {

		return /* html */ `

			${ data.partials.Hero.render( data, {
				...data.sections?.Hero,
				heading: data.sections?.Hero?.heading || data.title.replace(
					` ${ data.settings.titleSeparator } ${ data.schema.localBusiness.name } in ${ data.schema.localBusiness.address.addressLocality }, ${ data.schema.localBusiness.address.addressRegion }`,
					''
				),
				subheading: data.sections?.Hero?.subheading ?? '',
				description: data.sections?.Hero?.description ?? '',
				showOwnerIntroduction: data.sections?.Hero?.showOwnerIntroduction ?? false,
				showLocation: data.sections?.Hero?.showLocation ?? false,
				showCallsToAction: data.sections?.Hero?.showCallsToAction ?? false,
				variation: data.sections?.Hero?.variation ?? 'default',
			} ) }

			${ false === data.sections?.PageContent?.render ? '' : data.partials.Section.render( data, {
				sectionName: data.sections?.PageContent?.sectionName ?? 'Page__content',
				containerVariation: data.sections?.PageContent?.containerVariation ?? 'page',
				content: data.partials.Content.render( data, {
					contentVariation: data.sections?.PageContent?.contentVariation ?? 'default',
					renderMarkdown: data.sections?.PageContent?.renderMarkdown ?? true,
					content: data.content,
					aside: data.sections?.PageContent?.aside ?? false,
					asideVariation: data.sections?.PageContent?.asideVariation ?? 'default',
				} ),
			} ) }

			${ data.partials.About.render( data, data.sections?.About ?? {} ) }
			${ data.partials.Testimonials.render( data, data.sections?.Testimonials ?? {} ) }
			${ data.partials.Contact.render( data, data.sections?.Contact ?? {} ) }
		`;
	}
}
