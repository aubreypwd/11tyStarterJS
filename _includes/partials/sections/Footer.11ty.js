export default class Footer {

	static styles = {
		10: 'css/partials/sections/Footer.css',
	};

	render( data, context = this, options = {} ) {

		options = {
			render: true,
			...options,
		};

		if ( false === options.render ) {
			return ``;
		}

		return /* html */ `
			<footer class="Footer">
				<div class="Footer__content">
					${ data.partials.Section.render( data, this,
						{
							name: 'Footer',
							containerVariation: 'small',
							section: {
								tag: 'div',
							},
							content: {
								class: 'Footer__columns',
							},
						},
						this.renderSection( data, options ),
					) }
				</div>

				<div class="Footer__copyright">
					&copy; ${ data.fn.dateToFormat( new Date(), 'yyyy' ) } ${ data.fn.escHtml( data.schema.localBusiness.name ) }. All rights reserved.
				</div>
			</footer>
		`;
	}

	renderSection( data, options ) {

		return /* html */ `

			<div class="Footer__column Footer__column-1">

				<span class="Footer__column-heading SansSerif SansSerif--bold">Contact</span>

				<div class="Footer__column-content">
					${ data.partials.Address.render( data, this, {} ) }
				</div>
			</div>

			<div class="Footer__column Footer__column-3">

				<span class="Footer__column-heading SansSerif SansSerif--bold">Explore</span>

				<div class="Footer__column-content">
					<ul class="Footer__column-links">
						${ data.partials.NavigationLinks.render( data, this, {
							location: 'Footer',
							itemClass: 'Footer__column-links-link',
							additionalLinks: [
								{
									content: 'Privacy Policy',
									attributes: {
										href: '/privacy-policy/',
									},
									umami: {
										event: data.events.navigation,
										location: 'Footer',
										context: 'Privacy Policy',
									},
								},
								{
									content: 'Terms of Service',
									attributes: {
										href: '/terms-of-service/',
									},
									umami: {
										event: data.events.navigation,
										location: 'Footer',
										context: 'Terms of Service',
									},
								}
							]
						} ) }
					</ul>
				</div>
			</div>

			<div class="Footer__column Footer__column-2">

				<span class="Footer__column-heading SansSerif SansSerif--bold">Hours</span>

				<div class="Footer__column-content">
					${ data.partials.BusinessHours.render( data, this, {} ) }
				</div>
			</div>

			<div class="Footer__column Footer__column-0">
				<div class="Footer__column-content">

					<div class="Footer__column-mark">

						${ data.partials.LogoMark.render( data, this, {
							variation: 'alternate',
						} ) }

						<p class="Footer__slogan SansSerif SansSerif--regular">A fictional local business. Clear plans, practical support, and a next step you can understand.</p>

						<div class="Footer__socials">

							<!-- Font Awesome Free 6.7.2, Copyright 2024 Fonticons, Inc., CC BY 4.0: https://fontawesome.com/license/free -->

							<a class="Footer__social-link" href="${ data.fn.escHtml( data.schema.localBusiness.sameAs.find( ( url ) => url.includes( 'facebook.com/' ) ) || '#' ) }" aria-label="${ data.fn.escHtml( data.schema.localBusiness.name ) } on Facebook">
								<svg class="Footer__social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="24" aria-hidden="true" focusable="false">
									<path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"></path>
								</svg>
							</a>

							<a class="Footer__social-link" href="${ data.fn.escHtml( data.schema.localBusiness.sameAs.find( ( url ) => url.includes( 'instagram.com/' ) ) || '#' ) }" aria-label="${ data.fn.escHtml( data.schema.localBusiness.name ) } on Instagram">
								<svg class="Footer__social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24" aria-hidden="true" focusable="false">
									<path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>
		`;
	}
}
