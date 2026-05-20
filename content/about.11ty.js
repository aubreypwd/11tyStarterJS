export default class About {
	data() {
		return {
			eleventyNavigation: {
				key: 'About',
				order: 3,
			},
		};
	}

	render() {
		return /* html */ `
			<h1>About</h1>

			<p>I am a person that writes stuff.</p>
		`;
	}
}
