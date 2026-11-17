export default class Hero {

	static styles = {
		10: 'css/partials/sections/Hero.css',
	};

	render( data, context, options = {} ) {

		options = {

			variation: 'default',

			renderWith: true,
			renderLocation: true,
			renderCtas: true,

			heading: 'Unknown',
			subHeading: '',
			description: '',
			humanizedHeading: '',
			location: `${ data.schema.localBusiness.address.addressLocality }, ${ data.schema.localBusiness.address.addressRegion }`,

			...options,
		};

		if ( ! options.heading?.length || 'string' !== typeof options.heading ) {
			throw TypeError( 'options.heading must be set (string).' );
		}

		const location = 'Hero';

		return data.partials.Section.render( data, this,
			{
				name: 'Hero',
				variation: options.variation ?? 'default',
				containerVariation: 'default',
			},
			/* html */ `
				<div class="Hero__content Hero__variation-${ options.variation ?? 'default' }">

					<div class="Hero__content-wrapper">

						${ this.renderRightHeading( data, options ) }

						${ options.renderWith ? this.renderWith() : '' }
						${ options.subHeading?.length ? this.renderSubHeading( options.subHeading ) : '' }
						${ options.description?.length ? this.renderDescription( options.description ) : '' }
						${ options.renderCtas ? this.renderCtas( data, location ) : '' }
					</div>
				</div>
			`,
		);
	}

	renderRightHeading( data, options ) {

		if ( 'normal' === options.variation || 'string' !== typeof options.humanizedHeading || '' === options.humanizedHeading.trim() ) {

			return /* html */ `

				<!-- Just render the heading as humanized -->
				${ this.renderHeading( data, options, 'Hero__humanized' ) }
			`;
		}

		return /* html */ `

			${ this.renderHeading( data, options, 'Hero__heading' ) }

			<div class="Hero__humanized Serif Serif--regular">
				${ data.fn.escHtml( options.humanizedHeading ) }
			</div>
		`;
	}

	renderHeading( data, options, className ) {

		return /* html */ `
			<h1 class="Hero__title">
				<span class="${ className }">${ data.fn.escHtml( options.heading ) }</span>
				${ options.renderLocation ? this.renderLocation( options.location ) : '' }
			</h1>
		`;
	}

	renderWith() {
		return /* html */ `<p class="Hero__with">With <a href="#about" class="Hero__learn-more-about-alex">Alex Morgan</a>, your project coordinator at Northline &amp; Co.</p>`;
	}

	renderLocation( location ) {
		return /* html */ `<span class="Hero__location SansSerif SansSerif--regular"> in ${ location }</span>`;
	}

	renderSubHeading( subHeading ) {
		return /* html */ `<h2 class="Hero__subheading Serif Serif--regular">${ subHeading }</h2>`;
	}

	renderDescription( description ) {
		return /* html */ `<div class="Hero__description">${ description }</div>`;
	}

	renderCtas( data, location ) {
		return /* html */ `
			<div class="Hero__ctas">
				${ data.partials.PrimaryCTA.render( data, this, {
					location: location,
				} ) }

				${ data.partials.SecondaryCTA.render( data, this, {
					location: location,
				} ) }
			</div>
		`;
	}
}
