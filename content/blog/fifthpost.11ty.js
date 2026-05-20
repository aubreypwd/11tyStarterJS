export default class FifthPost {
	data() {
		return {
			title: 'This is a fifth post',
			date: '2023-01-23',
			draft: true,
		};
	}

	render( data ) {
		return data.functions.markdown( /* markdown */ `
			This is a draft post
		` );
	}
}
