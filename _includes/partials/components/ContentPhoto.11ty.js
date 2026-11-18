export default class ContentPhoto {

	static styles = {
		10: 'css/partials/components/ContentPhoto.css',
	};

	render( data, options = {} ) {

		options = {
			reverse: false,
			...options,
		};

		return /* html */ `

			<div class="Content__photo Content__photo--${ options.reverse ? 'reverse' : 'normal' }">

				<!-- Image -->
				<div class="Content__photo-block Content__photo-photo">
					<img class="Content__photo-placeholder" src="${ data.fn.escHtml( options.image ) }" alt="${ data.fn.escHtml( options.alt ?? '' ) }" width="800" height="600" loading="lazy" decoding="async" eleventy:ignore>
				</div>

				<!-- Content -->
				<div class="Content__photo-block Content__photo-content">
					${ data.fn.markdown( options.content ?? '' ) }
				</div>
			</div>
		`;
	}
}
