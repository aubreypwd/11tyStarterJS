/**
 * Renders the retained reusable partials.
 *
 * @since August 13, 2026
 */
export default class Partials {

	/**
	 * CSS file paths keyed by numeric load priority.
	 *
	 * @since September 15, 2026
	 *
	 * @type {object}
	 */
	static styles = {
		10: 'css/Partials.css',
	};

	/**
	 * Provides partials-page data.
	 *
	 * @since August 13, 2026
	 * @since September 11, 2026 Adds link and button partial examples.
	 * @since September 15, 2026 Adds a Toast partial example.
	 *
	 * @return {object} Partials-page data.
	 */
	data() {
		return {
			layout: 'layouts/Page.11ty.js',
			permalink: '/partials/',
			title: 'Partials',
			description: 'Reusable address, business-hours, link, button, and toast partials for the starter site.',
			eleventyNavigation: {
				key: 'Partials',
				title: 'Partials',
				order: 4,
			},
		};
	}

	/**
	 * Renders the retained partials.
	 *
	 * @since August 13, 2026
	 * @since September 11, 2026 Renders link and button partial examples.
	 * @since September 15, 2026 Adds explicit Flex classes.
	 * @since September 15, 2026 Renders default and error Toast examples.
	 *
	 * @param {object} data Eleventy data cascade.
	 * @return {string} Partials-page HTML.
	 */
	render( data ) {
		return /* html */ `
			<h1>Partials</h1>

			<section class="Partials Flex Flex--0-column">
				<h2>Address</h2>
				${ data.partials.Address.render( data, this ) }

				<h2>Business hours</h2>
				${ data.partials.BusinessHours.render( data, this ) }

				<h2>Link</h2>
				<p>${ data.partials.Link.render( data, this, 'About this starter', {
					href: '/about/',
				} ) }</p>

				<h2>Button</h2>
				<p>${ data.partials.Button.render( data, this, 'Example button', {
					type: 'button',
				} ) }</p>

				<h2>Toast</h2>
				<p>Click a button to show a notification.</p>

				<p>${ data.partials.Button.render( data, this, 'Show default toast', {
					type: 'button',
					onclick: `window.toast( 'default', true )`,
				} ) }</p>

				<p>${ data.partials.Button.render( data, this, 'Show error toast', {
					type: 'button',
					onclick: `window.toast( 'error', true )`,
				} ) }</p>

				${ data.partials.Toast.render( data, this, 'default', '', 'This is the default toast message.' ) }
				${ data.partials.Toast.render( data, this, 'error', 'error', 'This is the error toast message.' ) }
			</section>
		`;
	}
}
