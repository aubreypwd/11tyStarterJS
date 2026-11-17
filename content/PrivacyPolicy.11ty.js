export default class PrivacyPolicy {

	data() {
		return {
			layout: 'layouts/Page.11ty.js',
			permalink: '/privacy-policy/',
			title: 'Privacy Policy',
			description: 'Learn what Northline & Co. collects through this website, how it uses contact details and analytics, and how you can unsubscribe from future marketing emails.',
			Hero: {
				heading: 'Privacy Policy',
			}
		};
	}

	render( data ) {
		return data.fn.printFile( 'md/PrivacyPolicy.md', data );
	}
}
