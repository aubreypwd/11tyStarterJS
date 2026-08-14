/**
 * Defines site metadata and business contact settings.
 *
 * @since August 13, 2026
 */

/**
 * Formats a schema time for display.
 *
 * @since August 13, 2026
 *
 * @param {string} time ISO time value.
 * @return {string} Formatted time.
 */
function formatTime( time ) {
	const [ hours, minutes ] = time.split( ':' );
	const hoursNumber = Number( hours );
	const period = hoursNumber >= 12 ? 'PM' : 'AM';
	const displayHours = hoursNumber % 12 || 12;

	return `${ displayHours }:${ minutes } ${ period }`;
}

/**
 * Formats one business-hours specification.
 *
 * @since August 13, 2026
 *
 * @param {object} specification Business-hours data.
 * @return {string} Formatted hours or closed status.
 */
function formattedHours( specification ) {
	if ( specification.opens === '00:00' && specification.closes === '00:00' ) {
		return 'Closed';
	}

	return `${ formatTime( specification.opens ) } - ${ formatTime( specification.closes ) }`;
}

export default {
	language: 'en',
	url: 'https://example.com',
	author: {
		name: 'Aubrey Portwood',
		email: 'hello@hireaubrey.com',
		url: 'https://hireaubrey.com',
	},
	business: {
		contact: {
			phone: {
				type: 'cell',
				textable: true,
			},
			cta: 'Call or text, or send a message to learn more.',
		},
	},
	settings: {
		titleSeparator: '-',
	},
};
