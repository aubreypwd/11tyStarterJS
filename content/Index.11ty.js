export default class Index {

	data() {
		return {

			layout: 'layouts/Category.11ty.js',
			permalink: '/',
			description: 'Meet Northline & Co., a fictional local business with clear plans, practical support, and three example service categories in Example City.',

			Category: {
				layoutVariation: 'home',
				name: 'Primary Business Category',
			},

			sections: {

				Hero: {
					heading: 'A Clear Plan for What Comes Next',
					subheading: 'Northline & Co. in Example City',
					headingLayout: 'single-heading',
					description: `Bring your idea, your questions, or the part of your project that has you stuck. Alex Morgan helps you compare options and put the next steps in writing.

						This is a fictional demonstration business. All services, people, locations, and reviews are sample content.`,
				},

				Services: {
					sectionName: 'Services',
					sectionHeader: {
						sectionName: 'Category',
						eyebrow: 'Services at Northline & Co.',
						heading: 'Three Ways to Move Your Project Forward',
						eyebrowTag: 'h2',
						headingTag: 'span',
					},
					items: [
						{
							image: 'https://placehold.co/800x600/c4d9f1/102b49?text=Service+Image',
							reverse: true,
							heading: 'Primary Business Category',
							content: `Start with the work that matters most. You can turn an early idea into a defined scope, compare the practical options, and agree what happens first.

								Northline & Co. is a fictional business. This category demonstrates discovery, planning, delivery, and review services with written notes at each stage.`,
							url: '/primary-business-category/',
						},
						{
							image: 'https://placehold.co/800x600/c4d9f1/102b49?text=Service+Image',
							reverse: false,
							heading: 'Secondary Category A',
							content: `When the details need a closer look, you can focus on one decision at a time. Check the scope, compare approaches, or work out a schedule before moving ahead.

								These sample services show how Northline & Co. would help you understand the differences between your options and keep unresolved questions visible.`,
							url: '/secondary-category-a/',
						},
						{
							image: 'https://placehold.co/800x600/c4d9f1/102b49?text=Service+Image',
							reverse: true,
							heading: 'Secondary Category B',
							content: `You can return with a new question without rebuilding the whole plan. A second review, a short support session, or organized project records can help you decide what comes next.

								This fictional category demonstrates ongoing support alongside larger projects, with room to pause or change direction.`,
							url: '/secondary-category-b/',
						},
					],
				},
			},
		};
	}
}
