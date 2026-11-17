/**
 * Renders the site header.
 *
 * @since August 13, 2026
 * @since September 14, 2026 Keeps Flex layout modifiers in the component stylesheet.
 * @since September 15, 2026 Moves Flex layout modifiers into the markup for native CSS.
 * @since October 27, 2026 Inlines navigation in the header.
 * @since October 27, 2026 Moves layout and visibility into the component stylesheet.
 */
export default class Header {

	/**
	 * CSS file paths keyed by numeric load priority.
	 *
	 * @since August 13, 2026
	 *
	 * @type {object}
	 */
	static styles = {
		10: 'css/partials/sections/Header.css',
	};

	static scripts = {
		10: 'js/partials/sections/Header.js',
	};

	/**
	 * Renders the site header content.
	 *
	 * @since August 13, 2026
	 * @since September 15, 2026 Adds explicit Flex classes.
	 * @since October 27, 2026 Renders navigation in the header.
	 * @since October 27, 2026 Keeps only semantic component classes in the markup.
	 * @since October 29, 2026 Accepts a render options object.
	 * @since October 29, 2026 Supports conditional rendering through options.
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @param {object} options Options controlling whether the header renders.
	 * @return {string} Header HTML.
	 */
	render( data, context = this, options = {} ) {

		options = {
			render: true,
			hideContact: false,
			...options,
		};

		if ( false === options.render ) {
			return ``;
		}

		const location = 'Header';

		return data.partials.Section.render( data, this,
			{
				name: 'Header',
				variation: options.variation ?? 'default',
				containerVariation: 'default',
				section: {
					tag: 'header',
				},
			},
			/* html */ `

					<div class="Header__logo-menu">
						${ data.partials.LogoMark.render( data, this ) }

						${ data.partials.Button.render(
							data,
							this,
							{
								content: '<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"/></svg>',
								attributes: {
									'aria-controls': 'navigation',
									'aria-expanded': 'false',
									'aria-label': 'Toggle navigation',
									class: 'Header__mobile-trigger',
									type: 'button',
									id: 'Header__mobile-trigger',
								},
							},
						) }
					</div>

					<nav class="Header__menu" id="navigation">
						<p class="VisuallyHidden">Top level navigation menu</p>

						<ul class="Header__navigation-list">

							${ data.partials.NavigationLinks.render( data, this, {
								location: location,
								itemClass: 'Header__item',
								linkClass: 'Header__link',
							} ) }
						</ul>
					</nav>

					<div class="Header__buttons">

						${ data.partials.SecondaryCTA.render( data, this, {
							location: location,
							class: 'Header__button-call',
						} ) }

						${ options.hideContact ? '' : data.partials.PrimaryCTA.render( data, this, {
							location: location,
							class: `Header__button-schedule`,
							content: 'Schedule Consultation',
						} ) }
					</div>
			`,
		);
	}
}
