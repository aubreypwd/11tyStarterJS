/**
 * Renders the business-hours section.
 *
 * @since Unknown
 */
export default class BusinessHours {

	// Content
	/**
	 * Renders the business-hours list.
	 *
	 * @since Unknown
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @return {string} Business-hours HTML.
	 */
	render( data, context = this ) {

		if ( false === Array.isArray( data.schema?.localBusiness?.openingHoursSpecification ) ) {
			return '';
		}

		return /* html */ `

			<dl class="BusinessHours">
				${ this.renderBusinessHours( data ) }
			</dl>
		`;
	}

	/**
	 * Renders LocalBusiness opening hours.
	 *
	 * @since July 21, 2026
	 * @since July 21, 2026 Renders one row for each day of the week.
	 *
	 * @param {object} data Template data containing LocalBusiness schema.
	 * @return {string} Business hours HTML.
	 */
	renderBusinessHours( data ) {

		return [
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday',
		]
			.map( ( day ) => {

				return /* html */ `
					<div class="BusinessHours__row">
						<dt class="BusinessHours__day">${ data.fn.escHtml( day ) }</dt>
						${ this.renderBusinessHour( data, day ) }
					</div>
				`;
			} )
			.join( '' );
	}

	/**
	 * Renders the hours for one day.
	 *
	 * @since July 21, 2026
	 *
	 * @param {object} data Template data containing LocalBusiness schema.
	 * @param {string} day Day of the week.
	 * @return {string} Hours or closed status HTML.
	 */
	renderBusinessHour( data, day ) {

		const hours = data.schema.localBusiness.openingHoursSpecification.find( ( openingHours ) => {

			return Array.isArray( openingHours.dayOfWeek )
				? openingHours.dayOfWeek.includes( day )
				: openingHours.dayOfWeek === day;
		} );

		if ( 'undefined' === typeof hours ) {
			return /* html */ `<dd class="BusinessHours__value">Closed</dd>`;
		}

		return /* html */ `
			<dd class="BusinessHours__value">
				<time class="BusinessHours__time" datetime="${ data.fn.escHtml( hours.opens ) }">${ this.formatBusinessHour( hours.opens ) }</time> &ndash;
				<time class="BusinessHours__time" datetime="${ data.fn.escHtml( hours.closes ) }">${ this.formatBusinessHour( hours.closes ) }</time>
			</dd>
		`;
	}

	/**
	 * Formats an ISO time for human-readable display.
	 *
	 * @since July 21, 2026
	 *
	 * @param {string} time ISO time value.
	 * @return {string} Formatted time.
	 */
	formatBusinessHour( time ) {

		// Keep schema times independent of the build machine's timezone.
		return new Intl.DateTimeFormat( 'en-US', {
			hour: 'numeric',
			minute: '2-digit',
			timeZone: 'UTC',
		} ).format(
			new Date( Date.UTC( 1970, 0, 1, Number( time.slice( 0, 2 ) ), Number( time.slice( 3, 5 ) ) ) )
		);
	}
}
