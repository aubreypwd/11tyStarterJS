/**
 * Renders the base site layout.
 *
 * @since Unknown
 */
export default class Base {

	/**
	 * JavaScript file paths keyed by numeric load priority.
	 *
	 * @since August 13, 2026
	 *
	 * @type {object}
	 */
	static scripts = {
		20: 'node_modules/@zachleat/heading-anchors/heading-anchors.js',
	};

	/**
	 * Renders the complete HTML document.
	 *
	 * @since Unknown
	 * @since September 11, 2026 Loads Sass styles through the Eleventy render context.
	 *
	 * @param {object} data Eleventy data cascade.
	 * @return {Promise} Rendered HTML document.
	 */
	async render( data ) {
		// Content
		return /* html */ `
			<!doctype html>

			<html lang="${ data.fn.escHtml( data.metadata.language ) }">
				<head>
					<title>${ data.fn.escHtml( data.title || data.schema?.localBusiness?.name ) }</title>

					<!-- Meta -->
					<meta charset="utf-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<meta name="description" content="${ data.fn.escHtml( data.description || data.schema.localBusiness.description ) }">
					<link rel="canonical" href="${ data.fn.escHtml( new URL( data.page.url, data.metadata.url ).href ) }">

					<!-- Open Graph -->
					<meta property="og:title" content="${ data.fn.escHtml( data.title || data.schema.localBusiness.name ) }">
					<meta property="og:description" content="${ data.fn.escHtml( data.description || data.schema.localBusiness.description ) }">
					<meta property="og:type" content="${ data.page?.inputPath?.includes( '/blog' ) ? 'article' : 'website' }">
					<meta property="og:site_name" content="${ data.fn.escHtml( data.schema.localBusiness.name ) }">
					<meta property="og:url" content="${ data.fn.escHtml( new URL( data.page.url, data.metadata.url ).href ) }">
					<meta property="og:image" content="/img/social.webp"> <!-- @TODO: Add the social sharing image. -->
					<meta property="og:image:alt" content="${ data.fn.escHtml( data.title || data.schema.localBusiness.name ) }">

					<!-- Twitter -->
					<meta name="twitter:card" content="summary_large_image">
					<meta name="twitter:title" content="${ data.fn.escHtml( data.title || data.schema.localBusiness.name ) }">
					<meta name="twitter:description" content="${ data.fn.escHtml( data.description || data.schema.localBusiness.description ) }">
					<meta name="twitter:image" content="/img/social.webp"> <!-- @TODO: Add the social sharing image. -->

					<!-- Icons -->
					<!-- @TODO: Use https://realfavicongenerator.net to generate these icons and place them directly in public/. -->
					<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
					<link rel="icon" type="image/svg+xml" href="/favicon.svg">
					<link rel="shortcut icon" href="/favicon.ico">
					<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
					<meta name="apple-mobile-web-app-title" content="${ data.fn.escHtml( data.title || data.schema.localBusiness.name ) }">
					<link rel="manifest" href="/site.webmanifest">

					<!-- RSS -->
					<link rel="alternate" href="/feed/feed.xml" type="application/atom+xml" title="${ data.fn.escHtml( data.schema.localBusiness.name ) }">

					<!-- Schema -->
					${ data.partials.Schema.render( data, this ) }

					<!-- @TODO: Add Analytics -->

					<!-- Styles -->
					${ await data.fn.renderStyle( 'scss/GoogleFonts.scss', data, this ) }
					${ await data.fn.renderStyle( 'scss/Base.scss', data, this ) }
					${ await data.fn.renderStyle( 'scss/SmoothScrolling.scss', data, this ) }
					${ await data.fn.renderStyle( 'scss/Colors.scss', data, this ) }
					${ await data.fn.renderStyle( 'scss/Posts.scss', data, this ) }
					${ await data.fn.renderStyle( 'scss/A11y.scss', data, this ) }
					${ await data.fn.renderStyle( 'scss/Utopia.scss', data, this ) }
					${ await data.fn.renderStyle( 'scss/Lists.scss', data, this ) }
					${ await data.fn.renderStyle( 'scss/Containers.scss', data, this ) }
					${ await data.fn.renderStyles( data, this ) }
					<style>${ this.getBundle( 'css' ) }</style>
				</head>

			<body class="Site">
				<a href="#main" id="skip-link" class="SkipLink VisuallyHidden">Skip to main content</a>

					<!-- Header -->
					${ data.partials.Header.render( data, this ) }

					<main id="main" class="Site__main Container Container--none">

						${ data.content }
					</main>

					<!-- Footer -->
					${ data.partials.Footer.render( data, this ) }

					<!-- Scripts -->
					${ await data.fn.renderScripts( data ) }
					<script type="module" src="${ this.getBundleFileUrl( 'js' ) }"></script>
				</body>
			</html>
		`.trimStart(); // Trim the start so we get <doctype> right away.
	}
}
