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
		10: 'css/partials/Header.css',
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
					${ this.renderNavigation() }
				</nav>

				<nav class="SiteHeader__actions" aria-label="Header actions">
					${ data.partials.ContactButton.render( data, this ) }
				</nav>
			</header>
		`;
	}

	/**
	 * Builds the header navigation list.
	 *
	 * @since August 13, 2026
	 *
	 * @return {string} Rendered navigation list.
	 */
	renderNavigation() {
		return /* html */ `
			<ul class="List List--unlisted SiteHeader__nav">
				<li class="SiteHeader__item"><a class="SiteHeader__link" href="/#services" title="Explore the example services.">Our Services</a></li>
				<li class="SiteHeader__item"><a class="SiteHeader__link" href="#about" title="Learn more about the example team.">About Us</a></li>
				<li class="SiteHeader__item"><a class="SiteHeader__link" href="/blog/" title="Read useful business notes.">Blog</a></li>
			</ul>
		`;
	}
}
