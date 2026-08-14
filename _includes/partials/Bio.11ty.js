/**
 * Renders one team biography.
 *
 * @since August 13, 2026
 */
export default class Bio {

	/**
	 * Renders a team biography block.
	 *
	 * @since August 13, 2026
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {object} context Rendering context.
	 * @param {string} cl Biography classes.
	 * @param {string} src Optional image path.
	 * @param {string} name Person name.
	 * @param {string} title Person title.
	 * @param {string} cred Person credentials.
	 * @param {string} blurb Person biography content.
	 * @return {string} Biography HTML.
	 */
	render( data, context, cl, src, name, title, cred, blurb ) {
		const initials = name.split( ' ' ).map( ( part ) => part[ 0 ] ).join( '' ).slice( 0, 2 );

		return /* html */ `

			<div class="Bio Bio--${ data.fn.escHtml( cl ) }">

				<figure class="Bio__figure Unmargin">
					${ src ? /* html */ `<img class="Bio__image" eleventy:ignore src="${ data.fn.escHtml( src ) }" alt="${ data.fn.escHtml( name ) }">` : /* html */ `<div class="Bio__portrait" aria-hidden="true">${ data.fn.escHtml( initials ) }</div>` }
				</figure>

				<div class="Bio__info">

					<header class="Bio__header">
						<p class="Bio__title Unmargin">${ data.fn.escHtml( title ) }</p>
						<h3 class="Bio__name Unmargin">${ data.fn.escHtml( name ) }</h3>
						<p class="Bio__credentials Unmargin">${ data.fn.escHtml( cred ) }</p>
					</header>

					<div class="Bio__blurb">
						${ data.fn.markdown( blurb ).replaceAll( '<p>', '<p class="Unmargin">' ) }
					</div>
				</div>
			</div>
		`;
	}
}
