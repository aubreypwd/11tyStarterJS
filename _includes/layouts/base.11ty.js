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
	 * Provides shared layout data.
	 *
	 * @since Unknown
	 *
	 * @return {object} Shared layout data.
	 */
	data() {
		return {
			sectionClasses: {
				Services: 'Container--xxl Container--light Container--top-left',
				Testimonials: 'Container--xxl Container--shadow Container--top-right',
				Bios: 'Container Container--xxl Container--light Container--top-left',
				Contact: 'Container--xxl Container--shadow Container--top-left Container--alt',
				ServiceAreas: 'Container--light Container--xxl Container--top-right',
			}
		}
	}

	/**
	 * Renders the complete HTML document.
	 *
	 * @since Unknown
	 *
	 * @param {object} data Eleventy data cascade.
	 * @return {Promise} Rendered HTML document.
	 */
	async render( data ) {
		// Class Props
		this.currentUrl = data.page?.url || '';

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

					<!-- Twitter -->
					<meta name="twitter:card" content="summary_large_image">
					<meta property="og:image" content=""> <!-- @TODO: Add the social sharing image. -->
					<meta name="twitter:image" content=""> <!-- @TODO: Add the social sharing image. -->

					<!-- Icons -->
					<link rel="icon" type="image/png" sizes="48x48" href=""> <!-- @TODO: Add the 48x48 favicon. -->
					<link rel="icon" type="image/png" sizes="32x32" href=""> <!-- @TODO: Add the 32x32 favicon. -->
					<link rel="apple-touch-icon" href=""> <!-- @TODO: Add the Apple touch icon. -->
					<link rel="preload" href="" as="font" type="font/woff2" crossorigin> <!-- @TODO: Add the primary local font preload. -->
					<link rel="preload" href="" as="font" type="font/woff2" crossorigin> <!-- @TODO: Add the display local font preload. -->
					<link rel="preload" as="image" href=""> <!-- @TODO: Add a page-specific hero image preload when a verified image is available. -->

					<!-- RSS -->
					<link rel="alternate" href="/feed/feed.xml" type="application/atom+xml" title="${ data.fn.escHtml( data.schema.localBusiness.name ) }">

					<!-- Schema -->
					${ data.partials.Schema.render( data, this ) }

					<!-- @TODO: Add Analytics -->

					<!-- Styles -->
					${ data.fn.renderStyle( '../css/GoogleFonts.css', data ) }
					${ data.fn.renderStyle( '../css/Base.css', data ) }
					${ data.fn.renderStyle( '../css/SmoothScrolling.css', data ) }
					${ data.fn.renderStyle( '../css/Colors.css', data ) }
					${ data.fn.renderStyle( '../css/Posts.css', data ) }
					${ data.fn.renderStyle( '../css/A11y.css', data ) }
					${ data.fn.renderStyle( '../css/Utopia.css', data ) }
					${ data.fn.renderStyle( '../css/Lists.css', data ) }
					${ data.fn.renderStyle( '../css/Buttons.css', data ) }
					${ data.fn.renderStyle( '../css/Containers.css', data ) }
					${ data.fn.renderStyle( '../css/Hero.css', data ) }
					${ data.fn.renderStyle( '../css/Sections.css', data ) }
					${ await data.fn.renderStyles( data ) }
					<style>${ this.getBundle( 'css' ) }</style>
				</head>

			<body class="Site">
				<a href="#main" id="skip-link" class="SkipLink VisuallyHidden Button Button--primary">Skip to main content</a>

					<!-- Header -->
					${ data.partials.Header.render( data, this ) }

					<main id="main" class="Site__main Container Container--none">

						<!-- Content -->
						${ data.content }

						<!-- Services show on the homepage; the remaining sections show on every page. -->
						${ '/' === data.page?.url ? data.partials.Services.render( data, this, data.sectionClasses.Services ) : `` }

						${ data.partials.Testimonials.render( data, this, data.sectionClasses.Testimonials ) }
						${ data.partials.Bios.render( data, this, data.sectionClasses.Bios ) }
						${ data.partials.Contact.render( data, this, data.sectionClasses.Contact ) }
						${ data.partials.ServiceAreas.render( data, this, data.sectionClasses.ServiceAreas ) }
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
