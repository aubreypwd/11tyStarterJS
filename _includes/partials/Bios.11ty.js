/**
 * Renders the team biography section.
 *
 * @since August 13, 2026
 */
export default class Bios {

	/**
	 * CSS file paths keyed by numeric load priority.
	 *
	 * @since August 13, 2026
	 *
	 * @type {object}
	 */
	static styles = {
		10: 'css/partials/Bios.css',
	};

	/**
	 * Renders the team biography section.
	 *
	 * @since August 13, 2026
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @param {string} cl Section classes.
	 * @return {string} Biography section HTML.
	 */
	render( data, context, cl = '' ) {

		return /* html */ `

			<section class="Bios ${ cl }" id="about">
				<div class="Bios__content Container__content Container__content--xxl">

					<header class="SectionHeader">
						<h2 class="SectionHeader__heading">Meet the Team</h2>
						<span class="SectionHeader__separator"></span>
						<p class="SectionHeader__brow">The people behind the example business</p>
					</header>

					<div class="Bios__list">

						${ data.partials.Bio.render( data, this,
							'main',
							'',
							'Alex Rivera',
							'Owner and Project Lead',
							'Example Team',
							`Alex helps local businesses turn scattered ideas into a website structure that customers can understand. This sample biography should be replaced with verified information for the real business.`
						) }

						<div class="Bios__secondary">

							${ data.partials.Bio.render( data, this,
								'secondary',
								'',
								'Morgan Lee',
								'Client Support Coordinator',
								'Example Team',
								`Morgan keeps projects moving, details organized, and the next useful improvement easy to see.`
							) }

							${ data.partials.Bio.render( data, this,
								'secondary',
								'',
								'Taylor Kim',
								'Operations Coordinator',
								'Example Team',
								`Taylor helps keep the business information, customer questions, and day-to-day details current.`
							) }
						</div>
					</div>
				</div>
			</section>
		`;
	}
}
