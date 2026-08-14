/**
 * Defines the shared service-category layout.
 *
 * @since August 13, 2026
 */
export default class ServiceCategory {

	/**
	 * CSS file paths keyed by numeric load priority.
	 *
	 * @since August 13, 2026
	 *
	 * @type {object}
	 */
	static styles = {
		10: 'css/layouts/ServiceCategory.css',
	};

	/**
	 * Provides category layout data and computed metadata.
	 *
	 * @since August 13, 2026
	 *
	 * @return {object} Service-category layout data.
	 */
	data() {
		return {
			layout: 'layouts/Base.11ty.js',
			eleventyComputed: {

				/**
				 * Build the category page title from the starter category.
				 *
				 * @since August 13, 2026
				 *
				 * @param {object} data Eleventy data cascade.
				 * @return {string} Category page title.
				 */
				title( data ) {
					return data.fn.serviceCategoryTitle( data, data.ServiceCategories[ data.serviceCategoryKey ].title );
				},

				/**
				 * Build the category page description from the starter category.
				 *
				 * @since August 13, 2026
				 *
				 * @param {object} data Eleventy data cascade.
				 * @return {string} Category page description.
				 */
				description( data ) {
					return data.ServiceCategories[ data.serviceCategoryKey ].description;
				},
			},
		};
	}

	/**
	 * Renders a service-category page.
	 *
	 * @since August 13, 2026
	 *
	 * @param {object} data Eleventy data cascade.
	 * @return {string} Rendered category page.
	 */
	render( data ) {
		const hero = data.hero || data.ServiceCategories[ data.serviceCategoryKey ];

		return /* html */ `

			<section class="ServiceCategory ServiceCategory__hero Hero Container Container--none Hero--secondary Hero--${ data.fn.escHtml( hero.class ?? 'shine' ) }">
				<div class="Hero__content Container Hero__content--${ hero.img ? 'with-image' : 'text-only' }">

					<div class="Hero__info">
						<h1 class="Hero__heading">${ data.fn.escHtml( hero.heading || hero.title ) }</h1>
						<span class="Hero__separator"></span>

						<h2 class="Hero__sub-heading">Located in ${ data.fn.escHtml( data.schema.localBusiness.address.addressLocality ) }, New Mexico</h2>
						<p class="Hero__description">${ data.fn.escHtml( hero.description ) }</p>

						<p class="Hero__actions">
							${ data.partials.ContactButton.render( data, this, 'Contact Us' ) }
						</p>
					</div>

					${ this.maybeRenderHeroImage( data ) }
				</div>
			</section>

			${ data.partials.SocialProof.render( data, this ) }

			${ data.content }
		`;
	}

	/**
	 * Renders the optional category hero image.
	 *
	 * @since August 13, 2026
	 *
	 * @param {object} data Eleventy data cascade.
	 * @return {string} Hero image HTML or an empty string.
	 */
	maybeRenderHeroImage( data ) {
		if ( false === ( data.hero?.img ?? false ) ) {
			return '';
		}

		return /* html */ `
			<figure class="Hero__image">
				<img class="Hero__image-content" alt="${ data.fn.escHtml( data.hero?.alt ?? '' ) }" eleventy:ignore src="${ data.fn.escHtml( `/img/service-categories/${ data.hero.img }` ) }">
			</figure>
		`;
	}
}
