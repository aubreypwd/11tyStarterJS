export default class Testimonials {

	static styles = {
		10: 'css/partials/sections/Testimonials.css',
	};

	render( data, context, options = {} ) {

		options = {
			variation: 'default',
			...options,
		};

		return data.partials.Section.render( data, this,
			{
				name: 'Testimonials',
				variation: options.variation,
				containerVariation: 'large',
			},
			/* html */ `

					${ data.partials.SectionHeader.render( data, this, {
						name: 'Testimonials',
						content: 'Sample Customer Stories',
						headingClass: 'Serif Serif--regular',
					} ) }

					<p class="Testimonials__sample-note">These are invented examples, not reviews from real customers.</p>
					<ul class="Testimonials__list">
						${ this.getTestimonials( data ) }
					</ul>

					<div class="Testimonials__actions">
						${ data.partials.Link.render( data, this, {
							content: 'Explore the Sample Stories',
							attributes: {
								class: 'Button Button--variation-orange Button--centered',
								href: '#',
							},
							umami: {
								event: data.events.readReviews,
								location: 'Testimonials',
							}
						} ) }
					</div>
			`,
		);
	}

	getTestimonials( data ) {

		let markup = ``;

		for ( const testimonial of data.testimonials ) {
			markup += this.renderTestimonial( data, testimonial );
		}

		return markup;
	}

	renderTestimonial( data, testimonial = {} ) {

		return /* html */ `

			<li class="Testimonials__item">

				<figure class="Testimonials__figure">

					<span aria-label="5 out of 5 stars" class="Testimonials__rating" role="img">
						<svg aria-hidden="true" focusable="false" class="Testimonials__rating-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg>
						<svg aria-hidden="true" focusable="false" class="Testimonials__rating-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg>
						<svg aria-hidden="true" focusable="false" class="Testimonials__rating-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg>
						<svg aria-hidden="true" focusable="false" class="Testimonials__rating-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg>
						<svg aria-hidden="true" focusable="false" class="Testimonials__rating-star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z"/></svg>
					</span>

					<blockquote class="Testimonials__quote SansSerif SansSerif--regular">
						${ data.fn.markdown( testimonial.quote ) }
					</blockquote>

					<figcaption class="Testimonials__caption">
						${ data.partials.Link.render( data, this, {
							content: data.fn.escHtml( testimonial.name ),
							attributes: {
								href: testimonial.reviewUrl,
								title: 'Read this review.',
								class: 'Testimonials__name SansSerif SansSerif--bold',
							},
							umami: {
								event: data.events.readReview,
								location: 'Testimonial Card',
								context: 'Testimonials',
							},
						} ) }
					</figcaption>
				</figure>
			</li>
		`;
	}
}
