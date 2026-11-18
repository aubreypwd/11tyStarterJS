import { defineLocalBusiness, defineWebPage } from '@unhead/schema-org';

export default class Base {

	data() {
		return {
			eleventyComputed: {
				pageSchema( data ) {

					return {

						// LocalBusiness
						LocalBusiness: defineLocalBusiness( {
							...data.schema.localBusiness,
							url: data.metadata.url,
						} ),

						// FAQPage
						...( Array.isArray( data.faq ) && data.faq.length > 0 ? {
							FAQPage: defineWebPage( {
								'@type': 'FAQPage',
								mainEntity: data.faq.map( ( faq ) => ( {
									'@type': 'Question',
									name: faq.question,
									acceptedAnswer: {
										'@type': 'Answer',
										text: data.fn.markdown( faq.answer ),
									},
								} ) ),
							} ),
						} : {} ),
					};
				},
			},
		};
	}

	static scripts = {
		20: 'node_modules/@zachleat/heading-anchors/heading-anchors.js',
	};

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
					${ data.robots ? /* html */ `<meta name="robots" content="${ data.fn.escHtml( data.robots ) }">` : '' }
					<link rel="canonical" href="${ data.fn.escHtml( new URL( data.page.url, data.metadata.url ).href ) }">

					<!-- Open Graph -->
					<meta property="og:title" content="${ data.fn.escHtml( data.title || data.schema.localBusiness.name ) }">
					<meta property="og:description" content="${ data.fn.escHtml( data.description || data.schema.localBusiness.description ) }">
					<meta property="og:type" content="${ data.page?.inputPath?.includes( '/blog' ) ? 'article' : 'website' }">
					<meta property="og:site_name" content="${ data.fn.escHtml( data.schema.localBusiness.name ) }">
					<meta property="og:url" content="${ data.fn.escHtml( new URL( data.page.url, data.metadata.url ).href ) }">

					<!--
						Enable after adding /img/social.webp. Update dimensions and descriptions to match the image.
						<meta property="og:image" content="${ data.fn.escHtml( new URL( '/img/social.webp', data.metadata.url ).href ) }">
						<meta property="og:image:width" content="1200">
						<meta property="og:image:height" content="630">
						<meta property="og:image:type" content="image/webp">
						<meta property="og:image:alt" content="Northline &amp; Co. Primary Business Category in Example City, EX.">
					-->

					<!-- Twitter -->
					<meta name="twitter:card" content="summary_large_image">
					<meta name="twitter:title" content="${ data.fn.escHtml( data.title || data.schema.localBusiness.name ) }">
					<meta name="twitter:description" content="${ data.fn.escHtml( data.description || data.schema.localBusiness.description ) }">

					<!--
						Enable with the Open Graph image tags above.
						<meta name="twitter:image" content="${ data.fn.escHtml( new URL( '/img/social.webp', data.metadata.url ).href ) }">
						<meta name="twitter:image:alt" content="Northline &amp; Co. Primary Business Category in Example City, EX.">
					-->

					<!-- Icons -->
					<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
					<link rel="icon" type="image/svg+xml" href="/favicon.svg">
					<link rel="shortcut icon" href="/favicon.ico">
					<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
					<meta name="apple-mobile-web-app-title" content="Northline & Co.">
					<link rel="manifest" href="/site.webmanifest">

					<!-- RSS -->
					<!--
					<link rel="alternate" href="/feed/feed.xml" type="application/atom+xml" title="${ data.fn.escHtml( data.schema.localBusiness.name ) }">
					-->

					<!-- Styles -->
					${ data.fn.renderStyle( 'css/layouts/Base/Colors.css', data ) }
					${ data.fn.renderStyle( 'css/layouts/Base/Utopia.css', data ) }
					${ data.fn.renderStyle( 'css/layouts/Base/fonts.css', data ) }
					${ data.fn.renderStyle( 'css/layouts/Base/images.css', data ) }
					${ data.fn.renderStyle( 'css/layouts/Base/breakpoints.css', data ) }
					${ data.fn.renderStyle( 'css/layouts/Base.css', data ) }
					${ data.fn.renderStyle( 'css/layouts/Base/Forms.css', data ) }
					${ data.fn.renderStyle( 'css/layouts/Base/SmoothScrolling.css', data ) }
					${ /* data.fn.renderStyle( 'css/layouts/Base/Posts.css', data ) */ '' }
					${ data.fn.renderStyle( 'css/layouts/Base/A11y.css', data ) }
					${ data.fn.renderStyle( 'css/layouts/Base/Containers.css', data ) }
					${ data.fn.renderStyle( 'css/layouts/Base/Button.css', data ) }
					${ await data.fn.renderStyles( data ) }
					<style>${ this.getBundle( 'css' ) }</style>

					${ data.partials.Schema.render( data, this ) }
					<!-- Paste your Umami analytics script here. -->
				</head>

			<body class="SansSerif SansSerif--regular Site Body--${ data.page.fileSlug }">
				<a href="#main" id="skip-link" class="SkipLink VisuallyHidden Button">Skip to main content</a>

				<!-- Header -->
				${ data.partials.Header.render( data, this, data.Header ) }

				<main id="main" class="Site__main">
					${ data.content }
				</main>

				<!-- Footer -->
				${ data.partials.Footer.render( data, this, data.Footer ) }

				<!-- Scripts -->
				${ await data.fn.renderScripts( data ) }
				<script type="module" src="${ this.getBundleFileUrl( 'js' ) }"></script>
			</body>
			</html>
		`.trimStart(); // Trim the start so we get <doctype> right away.
	}
}
