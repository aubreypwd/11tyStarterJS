export default class NotFound {


	data() {
		return {

			layout: 'layouts/Page.11ty.js',
			permalink: '404.html',
			eleventyExcludeFromCollections: true,

			title: 'Page not found',
			description: 'This page could not be found. Return to Northline & Co. homepage to explore services or contact Alex Morgan.',
			robots: 'noindex, follow',

			sections: {

				Hero: {
					description: 'This page could not be found. Return to Northline & Co. homepage to explore services or contact Alex Morgan.',
				},
			},
		};
	}

	render() {

		return /* html */ `
			<h2>Content not found.</h2>
			<p>That page is not here. Go <a href="/">home</a>.</p>
		`;
	}
}
