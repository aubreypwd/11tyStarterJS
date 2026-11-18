import metadata from './metadata.js';

export default {
	localBusiness: {
		'@type': 'LocalBusiness',
		'@id': `${ metadata.url }/#local-business`,
		name: 'Northline & Co.',
		legalName: 'Northline & Co. LLC',
		description: 'A fictional local business demonstrating Primary Business Category, Secondary Category A, and Secondary Category B services in Example City.',
		url: metadata.url,
		logo: 'https://placehold.co/320x100/173d69/f5f9ff?text=Northline+%26+Co.',
		image: 'https://placehold.co/600x600/173d69/f5f9ff?text=Team+Portrait',
		founder: {
			'@type': 'Person',
			'@id': `${ metadata.url }/#alex-morgan`,
			name: 'Alex Morgan',
			jobTitle: 'Owner and Project Coordinator',
			image: 'https://placehold.co/600x600/173d69/f5f9ff?text=Team+Portrait',
			worksFor: {
				'@id': `${ metadata.url }/#local-business`,
			},
		},
		owner: {
			'@id': `${ metadata.url }/#alex-morgan`,
		},
		employee: {
			'@id': `${ metadata.url }/#alex-morgan`,
		},
		telephone: '+12025550148',
		email: 'hello@northline.example',
		priceRange: '$$',
		paymentAccepted: 'Credit Card',
		foundingDate: '2026',
		address: {
			'@type': 'PostalAddress',
			streetAddress: '123 Example Avenue, Suite 200',
			addressLocality: 'Example City',
			addressRegion: 'EX',
			postalCode: '00000',
			addressCountry: 'US',
		},
		// Set these when replacing the fictional address with a real location.
		// geo: {
		// 	'@type': 'GeoCoordinates',
		// 	latitude: 0,
		// 	longitude: 0,
		// },
		// hasMap: 'https://www.google.com/maps?cid=YOUR_PLACE_ID',
		openingHoursSpecification: [
			{
				'@type': 'OpeningHoursSpecification',
				dayOfWeek: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ],
				opens: '09:00',
				closes: '17:00',
			},
		],
		areaServed: [ 'Example City', 'North Quarter', 'River District', 'East Commons', 'West Village', 'South Park' ],
		sameAs: [
			'https://www.facebook.com/northlineandco.demo/',
			'https://www.instagram.com/northlineandco.demo/',
		],
		contactPoint: [
			{
				'@type': 'ContactPoint',
				contactType: 'customer service',
				telephone: '+12025550148',
				email: 'hello@northline.example',
			},
		],
	},
};
