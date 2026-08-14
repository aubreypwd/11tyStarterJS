/**
 * Defines site metadata and business contact settings.
 *
 * @since August 13, 2026
 */

import schema from './schema.js';

const business = schema.localBusiness;

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
		owner: {
			name: 'Alex Rivera',
			role: 'Owner and Project Lead',
		},
		social: [
			{
				name: 'Example Facebook',
				url: 'https://example.com/11ty-starter-js/facebook',
				icon: '<svg class="SiteFooter__social-icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M14 8h3V4h-3c-3.3 0-5 1.8-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.7.3-1 1-1Z"/></svg>',
			},
			{
				name: 'Example Instagram',
				url: 'https://example.com/11ty-starter-js/instagram',
				icon: '<svg class="SiteFooter__social-icon" aria-hidden="true" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1"/></svg>',
			},
		],
	},
	settings: {
		titleSeparator: '-',
	},
};
