export default class ThankYouContact {

	data() {
		return {
			layout: 'layouts/Page.11ty.js',
			permalink: '/thank-you-for-contacting-us/',
			title: 'Thank You',
			description: 'Thanks for contacting Northline & Co.. Alex will be in touch shortly to hear what you’d like to discuss and answer your questions.',
			robots: 'noindex, nofollow',
			heroSubHeading: 'Alex will be in touch shortly.',
			heroDescription: false,
			Header: {
				hideContact: true,
			},
			Contact: {
				render: false,
			},
			Testimonials: {
				render: false,
			},
			Page: {
				Content: {
					variation: 'thank-you',
				}
			}
		};
	}

	render( data ) {

		return /* html */ `

			<h2>Your message to Alex was sent!</h2>

			<p>Alex will review your message and follow up to talk through your project priorities and answer your questions.</p>
			<p>You can review the sample service categories while you wait. This is a demonstration flow.</p>

			<p>
				${ data.partials.Link.render( data, this, {
					content: 'Okay',
					attributes: {
						class: 'Button',
						href: '/',
					},
				} ) }
			</p>
		`;
	}
}
