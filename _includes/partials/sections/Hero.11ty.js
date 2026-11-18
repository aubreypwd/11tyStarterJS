export default class Hero {

	static styles = {
		10: 'css/partials/sections/Hero.css',
	};

	render( data, options = {} ) {

		if ( false === options.render ) {
			return '';
		}

		options = {
			variation: 'default',
			headingLayout: 'title-and-headline',
			showOwnerIntroduction: true,
			showLocation: true,
			showCallsToAction: true,
			heading: 'Unknown',
			subheading: '',
			description: '',
			headline: '',
			locationLabel: `${ data.schema.localBusiness.address.addressLocality }, ${ data.schema.localBusiness.address.addressRegion }`,
			...options,
		};

		if ( ! options.heading?.length || 'string' !== typeof options.heading ) {
			throw TypeError( 'options.heading must be set (string).' );
		}

		const analyticsLocation = 'Hero';

		return data.partials.Section.render( data, {
			sectionName: 'Hero',
			sectionVariation: options.variation ?? 'default',
			containerVariation: 'default',
			content: /* html */ `
				<div class="Hero__content Hero__content--${ options.headingLayout }">

					<div class="Hero__content-wrapper">

						${ this.renderHeadingGroup( data, options ) }

						${ options.showOwnerIntroduction ? this.renderOwnerIntroduction() : '' }
						${ options.subheading?.length ? this.renderSubheading( data, options.subheading ) : '' }
						${ options.description?.length ? this.renderDescription( data, options.description ) : '' }
						${ options.showCallsToAction ? this.renderCallsToAction( data, analyticsLocation ) : '' }
					</div>
				</div>
			`,
		} );
	}

	renderHeadingGroup( data, options ) {

		if ( 'single-heading' === options.headingLayout || 'string' !== typeof options.headline || '' === options.headline.trim() ) {

			return /* html */ `

				<!-- Render a single headline when no separate title is needed. -->
				${ this.renderHeading( data, options, 'Hero__headline' ) }
			`;
		}

		return /* html */ `

			${ this.renderHeading( data, options, 'Hero__heading' ) }

			<div class="Hero__headline Serif Serif--regular">
				${ data.fn.escHtml( options.headline ) }
			</div>
		`;
	}

	renderHeading( data, options, className ) {

		return /* html */ `
			<h1 class="Hero__title">
				<span class="${ className }">${ data.fn.escHtml( options.heading ) }</span>
				${ options.showLocation ? this.renderLocation( data, options.locationLabel ) : '' }
			</h1>
		`;
	}

	renderOwnerIntroduction() {
		return /* html */ `<p class="Hero__with">With <a href="#about" class="Hero__learn-more-about-alex">Alex Morgan</a>, your project coordinator at Northline &amp; Co.</p>`;
	}

	renderLocation( data, locationLabel ) {
		return /* html */ `<span class="Hero__location SansSerif SansSerif--regular"> in ${ data.fn.escHtml( locationLabel ) }</span>`;
	}

	renderSubheading( data, subheading ) {
		return /* html */ `<h2 class="Hero__subheading Serif Serif--regular">${ data.fn.escHtml( subheading ) }</h2>`;
	}

	renderDescription( data, description ) {
		return /* html */ `<div class="Hero__description">${ data.fn.markdown( description ) }</div>`;
	}

	renderCallsToAction( data, analyticsLocation ) {

		return /* html */ `
			<div class="Hero__ctas">
				${ data.partials.PrimaryCTA.render( data, {
					analyticsLocation: analyticsLocation,
				} ) }

				${ data.partials.SecondaryCTA.render( data, {
					analyticsLocation: analyticsLocation,
				} ) }
			</div>
		`;
	}
}
