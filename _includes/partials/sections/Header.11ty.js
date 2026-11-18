export default class Header {

	static styles = {
		10: 'css/partials/sections/Header.css',
	};

	static scripts = {
		10: 'js/partials/sections/Header.js',
	};

	render( data, options = {} ) {

		if ( false === options.render ) {
			return '';
		}

		options = {
			showBookNow: true,
			...options,
		};

		const analyticsLocation = 'Header';

		return data.partials.Section.render( data,
			{
				sectionName: 'Header',
				sectionVariation: options.variation ?? 'default',
				containerVariation: 'default',
				sectionElement: {
					tag: 'header',
				},
				content: /* html */ `

					<div class="Header__logo-menu">
						${ data.partials.LogoMark.render( data ) }

						${ data.partials.Button.render(
							data,
							{
								content: '<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"/></svg>',
								attributes: {
									'aria-controls': 'navigation',
									'aria-expanded': 'false',
									'aria-label': 'Toggle navigation',
									class: 'Header__mobile-trigger',
									type: 'button',
									id: 'Header__mobile-trigger',
								},
							},
						) }
					</div>

					<nav class="Header__menu" id="navigation">
						<p class="VisuallyHidden">Top level navigation menu</p>

						<ul class="Header__navigation-list">

							${ data.partials.NavigationLinks.render( data, {
								analyticsLocation: analyticsLocation,
								itemClassName: 'Header__item',
								linkClassName: 'Header__link',
							} ) }
						</ul>
					</nav>

					<div class="Header__buttons">

						${ data.partials.SecondaryCTA.render( data, {
							analyticsLocation: analyticsLocation,
							className: 'Header__button-call',
						} ) }

						${ options.showBookNow ? data.partials.PrimaryCTA.render( data, {
							analyticsLocation: analyticsLocation,
							className: 'Header__button-schedule',
							label: 'Book Now',
						} ) : '' }
					</div>
			`,
		},
		);
	}
}
