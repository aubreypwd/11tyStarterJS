export default class PrimaryBusinessCategory {

	data() {

		return {
			permalink: '/primary-business-category/',
			layout: 'layouts/Category.11ty.js',
			category: 'Primary Business Category',
			description: 'Explore Primary Business Category at Northline & Co. in Example City, from the first conversation to a written plan and a final review.',
			eleventyComputed: {
				Hero( data ) {

					return {
						heading: data.category,
						humanizedHeading: 'Turn Your Idea Into a Workable Plan',
						subHeading: 'Start with the decisions that matter to you',
						description: data.fn.markdown( 'You bring the goal. Northline & Co. helps you choose a scope, understand the tradeoffs, and keep track of the work ahead.' ),
					};
				},
			},
			header: {
				name: 'Category',
				eyebrow: 'Primary Business Category',
				content: 'From the First Question to the Final Check',
				description: 'Your project starts with a conversation about what you need, what you can spend, and what must happen first. In this fictional example, Alex records those priorities in a short scope document. You can compare a smaller first step with a larger project before agreeing to a schedule. Each service below covers a different part of that process, so you can see where you would begin and what you would receive.',
				eyebrowTag: 'h2',
				tag: 'span',
			},
			services: [
				{
					src: 'https://placehold.co/800x600/c4d9f1/102b49?text=Service+Image',
					reverse: true,
					header: 'Discovery Session',
					content: `You do not need a finished brief to begin. Bring the questions you have and the outcome you are aiming for.

						In this sample service, you leave with a one-page summary of your priorities, open questions, and the information needed to choose your next step.`,
				},
				{
					src: 'https://placehold.co/800x600/c4d9f1/102b49?text=Service+Image',
					reverse: false,
					header: 'Project Planning',
					content: `A useful plan makes the choices visible. You can compare the scope, timing, and estimated cost of each option in the same document.

						Your example plan sets out responsibilities and review points, with a place to record any decisions that still need your approval.`,
				},
				{
					src: 'https://placehold.co/800x600/c4d9f1/102b49?text=Service+Image',
					reverse: true,
					header: 'Coordinated Delivery',
					content: `Once the scope is agreed, your work is organized around a short sequence of milestones. You can see what is underway and what comes after it.

						A change in priorities is recorded with its effect on timing and cost before the next stage begins. This is an invented service process for the demonstration site.`,
				},
				{
					src: 'https://placehold.co/800x600/c4d9f1/102b49?text=Service+Image',
					reverse: false,
					header: 'Project Review',
					content: `You finish with a walkthrough of the agreed work and a record of anything that remains open.

						The sample handover includes your project notes, useful instructions, and a short follow-up list. You can refer back to the same information when you are ready for another project.`,
				},
			],
		};
	}
}
