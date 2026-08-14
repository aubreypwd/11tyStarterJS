/**
 * Defines reusable fictional starter business schema data.
 *
 * Replace this example data before launching a real site.
 *
 * @since August 13, 2026
 */

export default {
	localBusiness: {
		'@type': 'LocalBusiness',
		'@id': 'https://example.com/#local-business',
		name: '11ty Starter JS',
		legalName: '11ty Starter JS',
		description: 'A flexible Eleventy starter for Albuquerque local-business websites.',
		url: 'https://example.com',
		telephone: '+15055550147',
		email: 'hello@example.com',
		priceRange: '$$',
		paymentAccepted: 'Credit Card',
		foundingDate: '2026',
		address: {
			'@type': 'PostalAddress',
			streetAddress: '123 Example Avenue NE',
			addressLocality: 'Albuquerque',
			addressRegion: 'NM',
			postalCode: '87102',
			addressCountry: 'US',
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: 35.0844,
			longitude: -106.6504,
		},
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ],
				opens: '09:00',
				closes: '17:00',
			},
		],
		areaServed: [
			'Albuquerque',
			'Old Town',
			'Downtown Albuquerque',
			'Nob Hill',
			'North Valley',
			'South Valley',
			'Rio Rancho',
		],
		hasMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3264.427635296353!2d-106.66927184999999!3d35.09603125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87220cd36c1f3b49%3A0x1584fe64c3315361!2sOld%20Town%2C%20Albuquerque%2C%20NM%2087104!5e0!3m2!1sen!2sus!4v1786680267745!5m2!1sen!2sus',
		sameAs: [
			'https://example.com/11ty-starter-js/facebook',
			'https://example.com/11ty-starter-js/instagram',
		],
		contactPoint: [
			{
				'@type': 'ContactPoint',
				contactType: 'customer service',
				telephone: '+15055550147',
				email: 'hello@example.com',
			},
		],
	},
};
