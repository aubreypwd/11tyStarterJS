/**
 * Renders the shared services section.
 *
 * @since August 13, 2026
 */
export default class Services {

	/**
	 * CSS file paths keyed by numeric load priority.
	 *
	 * @since August 13, 2026
	 *
	 * @type {object}
	 */
	static styles = {
		10: 'css/partials/Services.css',
	};

	/**
	 * Renders the homepage service categories.
	 *
	 * @since August 13, 2026
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @param {string} sectionClass Section classes.
	 * @return {string} Rendered services section.
	 */
	render( data, context, sectionClass = 'Container--xxl Container--light' ) {

		return /* html */ `

			<section class="Services Container ${ sectionClass }" id="services">

				<div class="Services__content Container__content Container__content--large">

					<header class="SectionHeader">
						<h2 class="SectionHeader__heading">Example Services</h2>
						<span class="SectionHeader__separator"></span>
						<p class="SectionHeader__brow">A few places for a local business to begin</p>
					</header>

					<div class="Services__list">

						${ data.partials.ServiceCard.render(
							data,
							this,
							'/website-design/#starter-website',
							'Starter Website',
							`A focused set of pages that introduces a local business, its services, and the next useful step for prospective customers.`,
							'Explore Website Design'
						) }

						${ data.partials.ServiceCard.render(
							data,
							this,
							'/content-strategy/#page-planning',
							'Page Planning',
							`A clear map of the information customers need before they decide whether to reach out.`,
							'Explore Content Strategy'
						) }

						${ data.partials.ServiceCard.render(
							data,
							this,
							'/local-business-support/#content-updates',
							'Content Updates',
							`Small, regular changes that keep hours, services, contact information, and announcements current.`,
							'Explore Business Support'
						) }
					</div>
				</div>
			</section>
		`;
	}
}
