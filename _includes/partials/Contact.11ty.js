/**
 * Renders the contact section.
 *
 * @since August 13, 2026
 */
export default class Contact {

	/**
	 * CSS file paths keyed by numeric load priority.
	 *
	 * @since August 13, 2026
	 *
	 * @type {object}
	 */
	static styles = {
		10: 'css/partials/Contact.css',
	};

	/**
	 * Renders the contact options and form.
	 *
	 * @since August 13, 2026
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @param {string} sectionClass Section classes.
	 * @return {string} Contact section HTML.
	 */
	render( data, context, sectionClass = '' ) {

		return /* html */ `

			<section class="Contact Container ${ sectionClass }" id="contact">
				<div class="Contact__content Container__content Container__content--large">

					<header class="SectionHeader">
						<h2 class="SectionHeader__heading">Contact Us</h2>
						<span class="SectionHeader__separator"></span>
						<p class="SectionHeader__brow">Start with your questions and the details that matter.</p>
					</header>

					<div class="Contact__layout">
						<div class="Contact__call-text">
							<p class="Contact__heading">Let’s talk</p>
							<p class="Contact__text">This example contact section gives a local business a clear place to answer questions and make the next step easy.</p>

							<div class="Contact__actions">
								<a class="Button Button--primary" href="tel:${ data.fn.escHtml( data.schema.localBusiness.telephone ) }">Call Us</a>
								<a class="Button Button--primary" href="sms:${ data.fn.escHtml( data.schema.localBusiness.telephone ) }">Text Us</a>
							</div>

							<p class="Contact__phone">
								<strong>Phone Number:</strong>
								<a class="Contact__phone-link" href="tel:${ data.fn.escHtml( data.schema.localBusiness.telephone ) }">${ data.fn.escHtml( data.fn.formatPhone( data.schema.localBusiness.telephone ) ) }</a>
							</p>

							<p class="Contact__note">If you reach out outside operating hours, expect a reply by the next business day.</p>

							<div class="Contact__hours">
								<p class="Contact__heading">Operating Hours</p>
								${ data.partials.BusinessHours.render( data, this ) }
							</div>
						</div>

						<div class="Contact__contact-form">
							<p class="Contact__heading">Email Us</p>

							<form class="Contact__form" name="contact" method="post" data-netlify="true" netlify-honeypot="bot-field">
								<input type="hidden" name="form-name" value="contact">

								<p class="Contact__honeypot VisuallyHidden">
									<label>
										Do not fill this out
										<input name="bot-field" type="text">
									</label>
								</p>

								<p class="Contact__field">
									<label class="Contact__label">
										Name (Required)
										<input class="Contact__input" name="name" type="text" autocomplete="name" required>
									</label>
								</p>

								<p class="Contact__field">
									<label class="Contact__label">
										Email (Required)
										<input class="Contact__input" name="email" type="email" autocomplete="email" required>
									</label>
								</p>

								<p class="Contact__field">
									<label class="Contact__label">
										Phone number
										<input class="Contact__input" name="phone" type="tel" autocomplete="tel" placeholder="Please include area code">
									</label>
								</p>

								<p class="Contact__field">
									<label class="Contact__label">
										How can we help?
										<textarea class="Contact__textarea" name="message" placeholder="Tell us a little about your goals or questions..." required></textarea>
									</label>
								</p>

								<button type="submit" class="Button Button--primary">Send Message</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		`;
	}
}
