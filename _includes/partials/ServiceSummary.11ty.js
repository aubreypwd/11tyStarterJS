/**
 * Renders one category-page service summary.
 *
 * @since August 13, 2026
 */
export default class ServiceSummary {

	/**
	 * CSS file paths keyed by numeric load priority.
	 *
	 * @since August 13, 2026
	 *
	 * @type {object}
	 */
	static styles = {
		10: 'css/partials/ServiceSummary.css',
	};

	/**
	 * Renders a service summary article.
	 *
	 * @since August 13, 2026
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @param {string} id The article ID.
	 * @param {string} title The title.
	 * @param {string} content The content.
	 * @param {string} cta Call-to-action text.
	 * @return {string} Service-summary HTML.
	 */
	render( data, context, id, title, content, cta = 'Contact Us' ) {
		return /* html */ `
			<article id="${ data.fn.escHtml( id ) }" class="ServiceSummary">

				<h3 class="ServiceSummary__heading">${ data.fn.escHtml( title ) }</h3>

				<div class="ServiceSummary__content">
					${ data.fn.markdown( data.fn.escHtml( content ) ) }
				</div>

				<div class="ServiceSummary__actions">
					${ data.partials.ContactButton.render( data, this, cta ) }
				</div>
			</article>
		`;
	}
}
