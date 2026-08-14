/**
 * Renders the testimonials section.
 *
 * @since August 13, 2026
 */
export default class Testimonials {

	/**
	 * CSS file paths keyed by numeric load priority.
	 *
	 * @since August 13, 2026
	 *
	 * @type {object}
	 */
	static styles = {
		10: 'css/partials/Testimonials.css',
	};

	/**
	 * Renders the testimonials content.
	 *
	 * @since August 13, 2026
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @param {string} sectionClass Section classes.
	 * @return {string} Testimonials HTML.
	 */
	render( data, context, sectionClass = '' ) {

		return /* html */ `

			<section class="Testimonials Container Container--medium ${ sectionClass }">

				<div class="Testimonials__content Container__content Container__content--large">

					<header class="SectionHeader">
						<h2 class="SectionHeader__heading">What Clients Are Saying</h2>
						<span class="SectionHeader__separator"></span>
						<p class="SectionHeader__brow">Example feedback for the starter site</p>
					</header>

					<ul class="Testimonials__list List List--unlisted">
						${ [
							{
								name: 'Example Client',
								content: 'The example site made it easier to understand what the business offers and what to do next.',
								href: '#contact',
							},
							{
								name: 'Albuquerque Example',
								content: 'The information was clear, useful, and easy to find on both a phone and a desktop.',
								href: '#contact',
							},
							{
								name: 'New Mexico Example',
								content: 'We had a straightforward place to begin and a clear path for future improvements.',
								href: '#contact',
							},
						].map( ( testimonial ) => data.partials.FiveStarReview.render(
							data,
							this,
							testimonial.href,
							testimonial.name,
							testimonial.content
						) ).join( '' ) }
					</ul>

					<p class="Testimonials__read-more">
						<a class="Button Button--primary" href="#contact">
							Replace These Examples
							<span class="Button__icon" aria-hidden="true">&rarr;</span>
						</a>
					</p>
				</div>
			</section>
		`;
	}
}
