export default class Head {

	render( data, context = this ) {

		this.fn = data.fn;
		this.context = context;

		return /* html */ `
		<!-- Place your own <head> content here -->
		`;
	}
}
