/**
 * Renders the site header.
 *
 * @since August 13, 2026
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
		10: 'scss/partials/Header.scss',
	};

	/**
	 * Renders the site header content.
	 *
	 * @since August 13, 2026
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @return {string} Header HTML.
	 */
	render( data, context = this ) {

		return /* html */ `

			<header class="SiteHeader Container Container--light">

				${ data.partials.LogoMark.render( data, this ) }

				<nav class="SiteHeader__menu" id="navigation">
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
	 *
	 * @param {object} data Eleventy data cascade.
	 * @return {string} Rendered navigation list.
	 */
	renderNavigation( data ) {
		return /* html */ `
			<ul class="List List--unlisted SiteHeader__nav">
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
