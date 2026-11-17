export default class SecondaryCategoryB {

	data() {

		return {
			permalink: '/secondary-category-b/',
			layout: 'layouts/Category.11ty.js',
			layoutVariation: 'default',
			category: 'Secondary Category B',
			description: 'Find one-to-one guidance and ongoing project support through Secondary Category B at the fictional Northline & Co.',
			eleventyComputed: {
				Hero( data ) {

					return {
						heading: data.category,
						humanizedHeading: 'Keep Useful Support Within Reach',
						subHeading: 'A second look when your project needs one',
						description: data.fn.markdown( 'You may only need help with one decision. Northline & Co. offers example support options that let you pick up the conversation where you left it.' ),
					};
				},
			},
			header: {
				name: 'Category',
				eyebrow: 'Secondary Category B',
				content: 'Advice You Can Return To',
				description: 'Secondary Category B is the ongoing-support side of this fictional business. You can bring a question from an existing project, ask for a second look at your notes, or prepare for the next phase. These services demonstrate a text-led category layout without photography. You keep a written summary after each example session, so advice does not depend on remembering every detail of the conversation.',
				eyebrowTag: 'h2',
				tag: 'span',
			},
			services: [
				{
					header: 'One-to-One Guidance',
					content: `Start with the decision in front of you. You can bring a draft, a question, or a choice you have been putting off.

						Your sample session ends with a written next step and any information you still need to gather.`,
				},
				{
					header: 'Independent Review',
					content: `A fresh reading can help you find assumptions that have become easy to miss. This fictional review checks your plan against your stated priorities.

						You receive a short list of questions and suggested revisions to consider before proceeding.`,
				},
				{
					header: 'Ongoing Support',
					content: `Keep one place for questions that come up as your project develops. Example support sessions can be scheduled around agreed review points.

						The notes carry forward, so each conversation starts with what changed rather than repeating the entire project history.`,
				},
				{
					header: 'Project Records',
					content: `Your decisions, scope, and open items belong together. This sample service organizes them into a set of records you can use later.

						A simple handover explains what each document covers and which version to refer to.`,
				},
				{
					header: 'Next-Step Planning',
					content: `When one phase ends, you can decide what deserves attention next. You review the remaining work against your current priorities and budget.

						The example plan makes room to pause, reduce the scope, or schedule a further stage.`,
				},
			],
			Category: { noImages: true },
		};
	}
}
