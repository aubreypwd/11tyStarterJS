export default class SecondaryCategoryA {

	data() {
		return {

			layout: 'layouts/Category.11ty.js',
			permalink: '/secondary-category-a/',
			description: 'Compare Secondary Category A services at Northline & Co., with example scope checks, options reviews, scheduling, and progress support.',

			Category: {
				name: 'Secondary Category A',
			},

			sections: {

				Hero: {
					headline: 'Make the Decisions Easier to Compare',
					subheading: 'Focused support for the parts that need more thought',
					description: 'When you have several possible ways forward, Northline & Co. helps you sort the practical differences before you commit time or money.',
				},

				Services: {
					sectionName: 'Category__section',
					sectionHeader: {
						sectionName: 'Category',
						eyebrow: 'Secondary Category A',
						heading: 'A Closer Look at Your Options',
						description: 'Secondary Category A covers the decisions that sit between an idea and an agreed plan. You can use a single review to check your scope or work through several sessions as the details develop. This fictional service list shows how a category page can explain related options without making every visit the same. Each example gives you a specific item to review, from a comparison sheet to an updated schedule.',
						eyebrowTag: 'h2',
						headingTag: 'span',
					},
					items: [
						{
							image: 'https://placehold.co/800x600/c4d9f1/102b49?text=Service+Image',
							reverse: true,
							heading: 'Scope Check',
							content: `Your scope should say what is included and where the work stops. This sample check brings those boundaries into one short document.

								You can spot missing decisions, remove work you do not need, and agree which items belong in a later phase.`,
						},
						{
							image: 'https://placehold.co/800x600/c4d9f1/102b49?text=Service+Image',
							reverse: false,
							heading: 'Options Review',
							content: `Two proposals can sound similar while covering different work. You compare them against the priorities already recorded for your project.

								The example review lists the practical differences, questions to ask, and assumptions that could affect the result.`,
						},
						{
							image: 'https://placehold.co/800x600/c4d9f1/102b49?text=Service+Image',
							reverse: true,
							heading: 'Schedule Planning',
							content: `A deadline is easier to assess when you can see the work that comes before it. This service maps the main tasks and the decisions each one depends on.

								Your sample schedule leaves review points visible, so you can choose a pace that fits your availability.`,
						},
						{
							image: 'https://placehold.co/800x600/c4d9f1/102b49?text=Service+Image',
							reverse: false,
							heading: 'Progress Check',
							content: `You review the work against the agreed plan while there is still time to make changes.

								The fictional progress note separates completed items, open questions, and decisions waiting for you. It gives the next conversation a clear starting point.`,
						},
						{
							image: 'https://placehold.co/800x600/c4d9f1/102b49?text=Service+Image',
							reverse: true,
							heading: 'Final Walkthrough',
							content: `Before closing the project, you check the agreed deliverables together. Any remaining questions go onto a short follow-up list.

								This sample walkthrough also gives you a chance to confirm where your records are kept and who to ask about future changes.`,
						},
					],
				},
			},
		};
	}
}
