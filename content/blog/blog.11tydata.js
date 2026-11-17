export default {
	// Disable sample posts without removing their source or changing draft status.
	eleventyExcludeFromCollections: true,
	eleventyComputed: {
		// Override individual sample-post permalinks as well as generated paths.
		permalink: false,
	},

	tags: [
		'posts'
	],
	layout: 'layouts/Post.11ty.js',
};
