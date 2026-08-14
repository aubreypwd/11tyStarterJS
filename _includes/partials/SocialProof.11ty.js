/**
 * Renders the social-proof section.
 *
 * @since Unknown
 */
export default class SocialProof {

	/**
	 * CSS file paths keyed by numeric load priority.
	 *
	 * @since August 13, 2026
	 *
	 * @type {object}
	 */
	static styles = {
		10: 'css/partials/SocialProof.css',
	};

	/**
	 * Renders the social-proof content.
	 *
	 * @since Unknown
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @return {string} Social-proof HTML.
	 */
	render( data, context ) {

		// Content
		return /* html */ `

			<section class="SocialProof Container Container--none">



				<ul class="SocialProof__content Container__content Container__content--large List List--unlisted">
					<li class="SocialProof__item">
						<div class="SocialProof__proof">5-Star Rated Locally</div>
						<div class="SocialProof__description">Trusted by clients throughout Albuquerque</div>
					</li>
					<li class="SocialProof__item">
						<div class="SocialProof__proof">Free, No-Pressure Consultation</div>
						<div class="SocialProof__description">Get clear answers before making a decision</div>
					</li>
					<li class="SocialProof__item">
						<div class="SocialProof__proof">Personalized, Consistent Care</div>
						<div class="SocialProof__description">Treatment plans tailored to you</div>
					</li>
				</ul>
			</section>
		`;
	}
}
