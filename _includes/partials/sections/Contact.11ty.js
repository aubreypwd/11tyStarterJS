export default class Contact {

	static styles = {
		10: 'css/partials/sections/Contact.css',
	};

	render( data, options = {} ) {

		if ( false === options.render ) {
			return '';
		}

		options = {
			variation: 'default',
			detailsSectionHeader: {},
			formSectionHeader: {},
			...options,
		};

		return data.partials.Section.render( data, {
			sectionName: 'Contact',
			sectionVariation: options.variation,
			containerVariation: 'medium',
			content: /* html */ `

					<div class="Contact__left">
						${ this.renderContactForm( data, options ) }
					</div>

					<div class="Contact__right">

						${ data.partials.SectionHeader.render( data, {
							sectionName: 'Contact',
							className: 'Contact__right-header eyebrow',
							heading: 'Contact Details',
							headingClassName: 'Contact__right-heading eyebrow',
							...options.detailsSectionHeader,
						} ) }

						<div class="Contact__right-buttons">

							${ data.partials.Link.render( data, {
								content: 'Call',
								attributes: {
									class: 'Button Button--variation-navy',
									href: `tel:${ data.schema.localBusiness.telephone }`,
								},
								umami: {
									event: 'Contact Form Call Button',
									location: 'Contact Form',
								}
							} ) }

							${ data.partials.Link.render( data, {
								content: `<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M108.2 322.7C114.3 307.5 112.2 290.1 102.6 276.8C88.1 256.7 80 233.1 80 208C80 141.2 140.5 80 224 80C307.5 80 368 141.2 368 208C368 274.8 307.5 336 224 336C208.1 336 192.9 333.7 178.7 329.5C168.4 326.4 157.3 327 147.3 331L96.9 351.2L108.3 322.7zM32 208C32 243.8 43.6 277.1 63.7 304.8L33.9 379.2C32.6 382.4 32 385.8 32 389.2C32 404 44 416 58.8 416C62.2 416 65.6 415.3 68.8 414.1L165.1 375.6C183.7 381.1 203.5 384 224 384C330 384 416 305.2 416 208C416 110.8 330 32 224 32C118 32 32 110.8 32 208zM416 576C436.6 576 456.3 573 474.9 567.6L571.2 606.1C574.4 607.4 577.8 608 581.2 608C596 608 608 596 608 581.2C608 577.8 607.3 574.4 606.1 571.2L576.4 496.8C596.4 469 608.1 435.7 608.1 400C608.1 317.6 546.4 248.5 463.1 229.3C461.5 245.6 458 261.2 453 276.2C516.9 291 560.2 343.5 560.2 400.1C560.2 425.2 552.1 448.8 537.6 468.9C528 482.2 525.9 499.5 532 514.8L543.4 543.3L493 523.1C483 519.1 471.9 518.6 461.6 521.6C447.4 525.8 432.2 528.1 416.3 528.1C344.1 528.1 289.2 482.4 275.6 426.9C260 430.1 243.9 431.9 227.5 432.1C243.9 514 322.2 576.1 416.3 576.1z"/></svg> Text`,
								attributes: {
									class: 'Button Button--variation-navy',
									href: `sms:${ data.schema.localBusiness.telephone }`,
								},
								umami: {
									event: 'Contact Form Text Button',
									location: 'Contact Form',
								}
							} ) }

							${ data.partials.Link.render( data, {
								content: `<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"/></svg> Email`,
								attributes: {
									class: 'Button Button--variation-navy',
									href: `mailto:${ data.schema.localBusiness.email }`,
								},
								umami: {
									event: 'Contact Form Email Button',
									location: 'Contact Form',
								}
							} ) }
						</div>

						<div class="Contact__right-info">

							<div class="Contact__right-info-column Contact__right-info-0">

								<div class="Contact__right-info-block">

									<h3 class="Contact__right-info-heading eyebrow">Address</h3>

									<div class="Contact__right-info-content">
										${ data.partials.Address.render( data ) }
									</div>
								</div>

							</div>

							<div class="Contact__right-info-column Contact__right-info-1">

								<div class="Contact__right-info-block">

									<h3 class="Contact__right-info-heading eyebrow">Hours</h3>

									<div class="Contact__right-info-content">
										${ data.partials.BusinessHours.render( data ) }
									</div>
								</div>

							</div>

						</div>
					</div>
			`,
		},
		);
	}

	renderContactForm( data, options ) {

		// Normal contact form.

		return /* html */ `

			${ data.partials.SectionHeader.render( data, {
				sectionName: 'Contact',
				className: 'Contact__left-header',
				heading: 'Contact Us',
				headingClassName: 'Contact__left-heading Serif Serif--regular',
				...options.formSectionHeader,
			} ) }

			<form netlify name="Contact Alex" method="post" class="Contact__form" action="/thank-you-for-contacting-us/" aria-label="Contact Alex">

				<input type="hidden" name="form-name" value="Contact Alex">

				<div class="Contact__form-area Contact__form-area-0">

					${ this.renderInputGroup( data, {
						prefix: 'Contact__form',
						attributes: {
							name: 'Name',
							autocomplete: 'name',
							required: 'required',
						},
					} ) }

					${ this.renderInputGroup( data, {
						prefix: 'Contact__form',
						attributes: {
							name: 'Email',
							autocomplete: 'email',
							required: 'required',
							type: 'email',
						},
					} ) }
				</div>

				<div class="Contact__form-area Contact__form-area-1">

					${ this.renderInputGroup( data, {
						prefix: 'Contact__form',
						attributes: {
							name: 'Phone',
							type: 'tel',
							autocomplete: 'tel',
							required: 'required',
						},
					} ) }
				</div>

				<div class="Contact__form-area Contact__form-area-2">

					${ this.renderInputGroup( data, {
						prefix: 'Contact__form',
						type: 'textarea',
						attributes: {
							name: 'Message',
							required: 'required',
						},
					} ) }
				</div>

				<div class="Contact__form-area Contact__form-area-submit">

					${ data.partials.Button.render( data, {
						content: 'Send to Alex',
						attributes: {
							type: 'submit',
							class: 'Button--variation-navy',
						},
						umami: {
							event: data.events.contactFormSubmitButton,
							location: 'Contact Form',
						}
					} ) }
				</div>
			</form>
		`;
	}

	renderInputGroup( data, options = {} ) {

		if ( 'undefined' === typeof options.prefix ) {
			throw new TypeError( 'options.prefix must be set.' );
		}

		return /* html */ `

			<label class="Contact__form-group Contact__form-group-${ options.attributes?.name || 'Unknown' }" for="${ data.fn.escStringToDashes( `${ options.prefix }-${ options.attributes?.name || 'Unknown' }` ) }">
				<span class="Contact__form-group-title">${ options.attributes?.name || 'Unknown' } ${ this.renderRequired( options ) }</span>
				<span class="Contact__form-group-input">
					${ this.renderInput( data, options ) }
				</span>
			</label>
		`;
	}

	renderRequired( options ) {

		if ( 'required' !== ( options.attributes?.required || false ) ) {
			return ``;
		}

		return /* html */ `<span class="Contact__form-group-title-required">(Required)</span>`;
	}

	renderInput( data, options ) {

		options.attributes = {
			autocomplete: 'on',
			id: data.fn.escStringToDashes( `${ options.prefix }-${ options.attributes?.name ?? 'Unknown' }` ),
			class: `${ options.prefix }-${ options.attributes?.type ?? 'input' }`,
			...( options.attributes ?? {} ),
		};

		if ( 'textarea' === ( options.type || '' ) ) {

			return data.fn.createElement(
				'textarea',
				'',
				options.attributes,
				options,
			);
		}

		// Default
		return data.fn.createElement(
			'input',
			'',
			options.attributes,
			options,
		);
	}
}
