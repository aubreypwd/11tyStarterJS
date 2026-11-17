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
		// 10: 'css/Partials.css',
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
			// permalink: '/partials/',
			permalink: false,
			eleventyExcludeFromCollections: true,
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
	 * @since October 27, 2026 Moves layout into the stylesheet.
	 *
	 * @param {object} data Eleventy data cascade.
	 * @return {string} Partials-page HTML.
	 */
	render( data ) {
		return /* html */ `
			<h1>Partials</h1>

			<section class="Partials">
				<h2>Address</h2>
				${ data.partials.Address.render( data, this ) }

				<h2>Business hours</h2>
				${ data.partials.BusinessHours.render( data, this ) }

				<h2>Link</h2>
				<p>${ data.partials.Link.render(
					data,
					this,
					{
						content: 'About this starter',
						attributes: {
							href: '#',
						},
					},
				) }</p>

				<h2>Button</h2>
				<p>${ data.partials.Button.render(
					data,
					this,
					{
						content: 'Example button',
						attributes: {
							type: 'button',
						},
					},
				) }</p>

				<h2>Toast</h2>
				<p>Click a button to show a notification.</p>

				<p>${ data.partials.Button.render(
					data,
					this,
					{
						content: 'Show default toast',
						attributes: {
							type: 'button',
							onclick: `window.toast( 'default', true )`,
						},
					},
				) }</p>

				<p>${ data.partials.Button.render(
					data,
					this,
					{
						content: 'Show error toast',
						attributes: {
							type: 'button',
							onclick: `window.toast( 'error', true )`,
						},
					},
				) }</p>

				${ data.partials.Toast.render(
					data,
					this,
					{
						id: 'default',
						cl: '',
						message: 'This is the default toast message.',
					},
				) }
				${ data.partials.Toast.render(
					data,
					this,
					{
						id: 'error',
						cl: 'error',
						message: 'This is the error toast message.',
					},
				) }
			</section>
		`;
	}
}
