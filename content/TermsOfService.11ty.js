export default class TermsOfService {

	data() {
		return {
			layout: 'layouts/Page.11ty.js',
			permalink: '/terms-of-service/',
			title: 'Terms of Service',
			description: 'Read the terms for using Northline & Co. website, including sample services, inquiry forms, and fictional business information.',
			Hero: {
				heading: 'Terms of Service',
			}
		};
	}

	render( data ) {
		return data.fn.printFile( 'md/TermsOfService.md', data );
	}
}
