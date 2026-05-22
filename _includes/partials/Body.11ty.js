export default class Body {

	render( data, context = this ) {

		this.fn = data.fn;
		this.context = context;

		return /* html */ `
			<!-- Place your own </body> content here -->
		`;
	}
}
