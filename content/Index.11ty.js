export default class Index {

	data() {

		return {
			permalink: '/',
			layout: 'layouts/Category.11ty.js',
			layoutVariation: 'home',
			category: 'Primary Business Category',
			description: 'Meet Northline & Co., a fictional local business with clear plans, practical support, and three example service categories in Example City.',
			eleventyComputed: {
				Hero( data ) {

					return {
						heading: 'A Clear Plan for What Comes Next',
						subHeading: 'Northline & Co. in Example City',
						variation: 'normal',
						description: data.fn.markdown( `
							Bring your idea, your questions, or the part of your project that has you stuck. Alex Morgan helps you compare options and put the next steps in writing.

							This is a fictional demonstration business. All services, people, locations, and reviews are sample content.
						` ),
					};
				},
			},
		};
	}
}
