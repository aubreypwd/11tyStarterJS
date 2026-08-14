/**
 * Renders the site footer.
 *
 * @since August 13, 2026
 */
export default class Footer {

	/**
	 * CSS file paths keyed by numeric load priority.
	 *
	 * @since August 13, 2026
	 *
	 * @type {object}
	 */
	static styles = {
		10: 'css/partials/Footer.css',
	};

	/**
	 * Renders the site footer content.
	 *
	 * @since August 13, 2026
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @return {string} Footer HTML.
	 */
	render( data, context = this ) {

		return /* html */ `

			<footer class="SiteFooter Container Container--large">
				<div class="SiteFooter__content Container__content Container__content--large">
					<div class="SiteFooter__column SiteFooter__column--business">

						${ data.partials.LogoMark.render( data, this ) }

						<p class="SiteFooter__offering">A flexible Eleventy foundation for local businesses that need clear services, useful content, and an easy way to get in touch.</p>

						<div class="SiteFooter__actions">
							${ data.partials.ContactButton.render( data, this ) }
						</div>
					</div>

					<div class="SiteFooter__column SiteFooter__column--contact">

						<p class="SiteFooter__heading">Contact Information</p>

						${ data.partials.Address.render( data, this ) }
					</div>

					<div class="SiteFooter__column SiteFooter__column--links">

						<p class="SiteFooter__heading">Links</p>

						<nav class="SiteFooter__nav" aria-label="Footer links">
							<ul class="SiteFooter__link-list List List--unlisted">
								<li><a class="SiteFooter__link" href="/about/">About Us</a></li>
								<li><a class="SiteFooter__link" href="/blog/">Blog</a></li>
								<li><a class="SiteFooter__link" href="#contact">Contact</a></li>
								<li><a class="SiteFooter__link" href="/feed/feed.xml">Feed</a></li>
							</ul>
						</nav>

						<ul class="SiteFooter__social-list List List--unlisted">
							${ this.renderSocialLi( data ) }
						</ul>
					</div>

					<div class="SiteFooter__column SiteFooter__column--departments">

						<p class="SiteFooter__heading">Departments</p>

						<nav class="SiteFooter__nav" aria-label="Service categories">
							<ul class="SiteFooter__link-list List List--unlisted">
								<li><a class="SiteFooter__link" href="/website-design/">Website Design</a></li>
								<li><a class="SiteFooter__link" href="/content-strategy/">Content Strategy</a></li>
								<li><a class="SiteFooter__link" href="/local-business-support/">Local Business Support</a></li>
							</ul>
						</nav>
					</div>

					<div class="SiteFooter__column SiteFooter__column--hours">

						<p class="SiteFooter__heading" id="business-hours">Hours</p>

						${ data.partials.BusinessHours.render( data, this ) }
					</div>
				</div>
			</footer>
		`;
	}

	/**
	 * Renders the footer social list.
	 *
	 * @since August 13, 2026
	 *
	 * @param {object} data Eleventy data cascade.
	 * @return {string} Social list HTML.
	 */
	renderSocialLi( data ) {
		return data.metadata.business.social
			.map( function( social ) {
				return /* html */ `<li class="SiteFooter__social-item"><a class="SiteFooter__social-link" title="${ data.fn.escHtml( social.name ) }" target="_blank" rel="noopener" href="${ data.fn.escHtml( social.url ) }">${ social.icon }</a></li>`;
			} ).join( '' );
	}
}
