export default class BusinessHours {

	static styles = {
		10: 'css/partials/components/BusinessHours.css',
	};

	render( data ) {

		if ( false === Array.isArray( data.schema?.localBusiness?.openingHoursSpecification ) ) {
			return '';
		}

		return /* html */ `

			<dl class="BusinessHours">
				${ this.renderBusinessHours( data ) }
			</dl>
		`;
	}

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
