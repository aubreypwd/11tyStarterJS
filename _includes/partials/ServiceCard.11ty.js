/**
 * Renders one homepage service card.
 *
 * @since Unknown
 */
export default class ServiceCard {

	// Content
	/**
	 * Renders a service card with links and a contact call to action.
	 *
	 * @since Unknown
	 * @since August 13, 2026 Scoped the homepage card class to the service-card component.
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @param {string} href Service URL.
	 * @param {string} name Service name.
	 * @param {string} content Service description.
	 * @param {string} cta Contact button text.
	 * @return {string} Service-card HTML.
	 */
	render( data, context, href, name, content, cta = 'Contact Us' ) {

		return /* html */ `

			<div class="ServiceCard">

				<div class="ServiceCard__info">

					<h3 class="ServiceCard__heading"><a class="ServiceCard__link" href="${ href }">${ name }</a></h3>

					<div class="ServiceCard__content">
						${ data.fn.markdown( content ) }
					</div>

					<p class="ServiceCard__actions">
						<a class="ServiceCard__learn-more" href="${ href }">Learn More &rarr;</a>
						${ data.partials.ContactButton.render( data, this, cta ) }
					</p>
				</div>
			</div><!-- service-card -->
		`;
	}
}
