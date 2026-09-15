/**
 * Renders the site header.
 *
 * @since August 13, 2026
 * @since September 14, 2026 Keeps Flex layout modifiers in the component stylesheet.
 * @since September 15, 2026 Moves Flex layout modifiers into the markup for native CSS.
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
		10: 'css/partials/Header.css',
	};

	/**
	 * Renders the site header content.
	 *
	 * @since August 13, 2026
	 * @since September 15, 2026 Adds explicit Flex classes.
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @return {string} Header HTML.
	 */
	render( data, context = this ) {

		return /* html */ `

			<header class="SiteHeader Container Container--light Flex Flex--0-column Flex--768-row Flex--768-row-horizontal-between Flex--768-row-items-center">

				${ data.partials.LogoMark.render( data, this ) }

				<nav class="SiteHeader__menu Flex Flex--0-column Flex--0-column-items-center Flex--0-column-vertical-center Flex--768-column-items-stretch Flex--768-column-vertical-start Flex__item--0-12 Flex__item--0-order-3 Flex__item--0-self-end Flex__item--768-order-2 Flex__item--768-self-auto" id="navigation">
					<p class="VisuallyHidden">Top level navigation menu</p>
					${ this.renderNavigation( data ) }
				</nav>
			</header>
		`;
	}

	/**
	 * Builds the header navigation list.
	 *
	 * @since August 13, 2026
	 * @since September 15, 2026 Adds explicit list and Flex classes.
	 *
	 * @param {object} data Eleventy data cascade.
	 * @return {string} Rendered navigation list.
	 */
	renderNavigation( data ) {
		return /* html */ `
			<ul class="NavigationList List--unlisted Flex Flex--0-row-horizontal-center Flex--768-row-horizontal-end Flex__item--0-12">
				${ data.fn.navigationItems( data ).map( function( navigation ) {
					return /* html */ `
						<li class="SiteHeader__item">
							<a class="SiteHeader__link" href="${ data.fn.escHtml( navigation.url ) }"${ navigation.url === data.page?.url ? ' aria-current="page"' : '' }>${ data.fn.escHtml( navigation.title ) }</a>
						</li>
					`;
				} ).join( '' ) }
			</ul>
		`;
	}
}
