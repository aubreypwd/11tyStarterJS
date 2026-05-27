export default class About {

	// Data
	data() {
		return {
			permalink: '/about/',
			eleventyNavigation: {
				key: 'About',
				order: 3,
			},
		};
	}

	// Render
	render() {
		return /* html */ `

			<h1>About</h1>

			<p>I am a person that writes stuff.</p>
		`;
	}
}
