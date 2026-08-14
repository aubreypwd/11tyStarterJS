/**
 * Renders the service-area section.
 *
 * @since Unknown
 */
export default class ServiceAreas {

	/**
	 * CSS file paths keyed by numeric load priority.
	 *
	 * @since August 13, 2026
	 *
	 * @type {object}
	 */
	static styles = {
		10: 'css/partials/ServiceAreas.css',
	};

	// Content
	/**
	 * Renders the service-area section and map.
	 *
	 * @since Unknown
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @param {string} sectionClass Section classes.
	 * @return {string} Service-area HTML.
	 */
	render( data, context, sectionClass = 'Container--light Container--xxl' ) {
		const mapUrl = data.schema.localBusiness.hasMap;

		return /* html */ `

			<section class="ServiceAreas Container ${ sectionClass }">



				<div class="ServiceAreas__content Container__content Container__content--large">

					<header class="SectionHeader">
						<h2 class="SectionHeader__heading">Areas This Business Serves</h2>
						<span class="SectionHeader__separator"></span>
						<p class="SectionHeader__brow">Proudly serving Albuquerque and surrounding areas</p>
					</header>

					<div class="ServiceAreas__locations-map">

						<ul class="ServiceAreas__areas List List--unlisted">
							<li class="ServiceAreas__area">Albuquerque</li>
							<li class="ServiceAreas__area">Old Town</li>
							<li class="ServiceAreas__area">Downtown Albuquerque</li>
							<li class="ServiceAreas__area">Sawmill District</li>
							<li class="ServiceAreas__area">Rio Grande Area</li>
							<li class="ServiceAreas__area">North Valley</li>
							<li class="ServiceAreas__area">South Valley</li>
							<li class="ServiceAreas__area">Los Ranchos de Albuquerque</li>
							<li class="ServiceAreas__area">Corrales</li>
							<li class="ServiceAreas__area">Albuquerque Westside</li>
							<li class="ServiceAreas__area">Northeast Heights</li>
							<li class="ServiceAreas__area">Rio Rancho</li>
						</ul>

						<div class="ServiceAreas__map">
							${ mapUrl ? /* html */ `<iframe class="ServiceAreas__map-embed" src="${ data.fn.escHtml( mapUrl ) }" width="600" height="450" style="border:0;" title="Business service area map" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>` : /* html */ `<!-- @TODO: Add the business map iframe URL to schema.localBusiness.hasMap. -->` }
						</div>
					</div>


				</div>
			</section>
		`;
	}
}
