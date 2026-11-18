import {
	HtmlBasePlugin,
	IdAttributePlugin,
	InputPathToUrlTransformPlugin,
} from '@11ty/eleventy';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import pluginNavigation from '@11ty/eleventy-navigation';
import { feedPlugin } from '@11ty/eleventy-plugin-rss';
import pluginSyntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import { transform as esbuildTransform } from 'esbuild';
import { minify as minifyHtml } from 'html-minifier-terser';
import postcss from 'postcss';
import postcssCustomMedia from 'postcss-custom-media';
import { PurgeCSS } from 'purgecss';
import metadata from './_data/metadata.js';
import schema from './_data/schema.js';

export default function ( eleventyConfig ) {

	const business = schema.localBusiness;

	// See _data/eleventyDataSchema.js.
	eleventyConfig.addPreprocessor( 'drafts', '*', ( data ) => {
		if ( data.draft ) {
			data.title = `${ data.title } (draft)`;
		}

		if ( data.draft && process.env.ELEVENTY_RUN_MODE === 'build' ) {
			return false;
		}
	} );

	eleventyConfig.addPassthroughCopy( { './public/': '/', } );
	eleventyConfig.addPassthroughCopy( { './content/img/css/': '/img/css/' } );
	eleventyConfig.addPassthroughCopy( { './content/img/social.webp': '/img/social.webp' } );
	eleventyConfig.addPassthroughCopy( { './content/img/favicons/favicon-96x96.png': '/favicon-96x96.png' } );
	eleventyConfig.addPassthroughCopy( { './content/img/favicons/favicon.svg': '/favicon.svg' } );
	eleventyConfig.addPassthroughCopy( { './content/img/favicons/favicon.ico': '/favicon.ico' } );
	eleventyConfig.addPassthroughCopy( { './content/img/favicons/apple-touch-icon.png': '/apple-touch-icon.png' } );
	eleventyConfig.addPassthroughCopy( { './content/img/favicons/web-app-manifest-192x192.png': '/web-app-manifest-192x192.png' } );
	eleventyConfig.addPassthroughCopy( { './content/img/favicons/web-app-manifest-512x512.png': '/web-app-manifest-512x512.png' } );

	// eleventyConfig.addPassthroughCopy( './content/feed/pretty-atom-feed.xsl' );

	/*
	 * Run Eleventy when these files change.
	 * https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets
	 */
	eleventyConfig.addWatchTarget( 'content/' );
	eleventyConfig.addWatchTarget( 'css/' );
	eleventyConfig.addWatchTarget( 'js/' );
	eleventyConfig.addWatchTarget( 'md/' );

	/*
	 * Per-page bundles. The bundle plugin collects literal <style> and <script>
	 * blocks from the layouts.
	 * https://github.com/11ty/eleventy-plugin-bundle
	 */
	eleventyConfig.addBundle( 'css', {
		toFileDirectory: 'dist',

		/*
		 * Add all <style> content to the css bundle.
		 * Use <style eleventy:ignore> to opt out.
		 * Supported selectors: https://www.npmjs.com/package/posthtml-match-helper
		 */
		bundleHtmlContentFromSelector: 'style',
	} );

	eleventyConfig.addBundle( 'js', {
		toFileDirectory: 'dist',
		transforms: [
			async function ( content ) {

				if ( 'string' !== typeof content ) {
					return content;
				}

				return ( await esbuildTransform( content, {
					format: 'esm',
					minify: true,
					target: 'es2022',
				} ) ).code;
			},
		],

		/*
		 * Add all <script> content to the js bundle.
		 * Use <script eleventy:ignore> to opt out.
		 * Supported selectors: https://www.npmjs.com/package/posthtml-match-helper
		 */
		bundleHtmlContentFromSelector: 'script',
	} );

	// Process the final bundle so custom media definitions are shared across component styles.
	eleventyConfig.addPlugin( ( config ) => {
		config.addTransform( 'postcss-inline-css', async function ( content ) {

			if (
				'string' !== typeof this.page?.outputPath ||
				false === this.page.outputPath.endsWith( '.html' ) ||
				'string' !== typeof content
			) {
				return content;
			}

			const stylePattern = /<style>([\s\S]*?)<\/style>/;
			const styleMatch = stylePattern.exec( content );

			if ( null === styleMatch ) {
				return content;
			}

			const postCSSResult = await postcss( [ postcssCustomMedia() ] ).process( styleMatch[ 1 ], {
				from: 'eleventy-inline.css',
			} );

			return content.replace(
				stylePattern,
				`<style>${ postCSSResult.css }</style>`
			);
		} );
	} );

	// Register after the bundle plugin so the final CSS is available to PurgeCSS.
	eleventyConfig.addPlugin( ( config ) => {
		config.addTransform( 'purge-and-minify-inline-css', async function ( content ) {

			if (
				'string' !== typeof this.page?.outputPath ||
				false === this.page.outputPath.endsWith( '.html' ) ||
				'string' !== typeof content
			) {
				return content;
			}

			const stylePattern = /<style>([\s\S]*?)<\/style>/;
			const styleMatch = stylePattern.exec( content );

			if ( null === styleMatch ) {
				return content;
			}

			const purgeCSSResults = await new PurgeCSS().purge( {
				content: [
					{
						extension: 'html',
						raw: content.replace( /<style[\s\S]*?<\/style>/g, '' ),
					},
				],
				css: [
					{
						raw: styleMatch[ 1 ],
					},
				],
				variables: false,
				safelist: {
					// Keep pseudo-state and runtime selectors missing from page markup.
					standard: [ /^:/, 'Header__mobile-active' ],
				},
			} );

			if (
				0 === purgeCSSResults.length ||
				'string' !== typeof purgeCSSResults[ 0 ].css
			) {
				return content;
			}

			const minifiedCSS = await esbuildTransform( purgeCSSResults[ 0 ].css, {
				loader: 'css',
				minify: true,
			} );

			return content.replace(
				stylePattern,
				`<style>${ minifiedCSS.code }</style>`
			);
		} );
	} );

	// Official plugins.
	eleventyConfig.addPlugin( pluginSyntaxHighlight, { preAttributes: { tabindex: 0 } } );
	eleventyConfig.addPlugin( pluginNavigation );
	eleventyConfig.addPlugin( HtmlBasePlugin );
	eleventyConfig.addPlugin( InputPathToUrlTransformPlugin );

	// Re-enable alongside the blog posts and tag pages when the blog is ready.
	// eleventyConfig.addPlugin( feedPlugin, {
	// 	type: 'atom',
	// 	outputPath: '/feed/feed.xml',
	// 	stylesheet: 'pretty-atom-feed.xsl',
	// 	collection: {
	// 		name: 'posts',
	// 		limit: 10,
	// 	},
	// 	metadata: {
	// 		language: metadata.language,
	// 		title: business.name,
	// 		subtitle: business.description,
	// 		base: metadata.url,
	// 		author: {
	// 			name: metadata.author.name,
	// 			email: metadata.author.email,
	// 			url: metadata.author.url,
	// 		},
	// 	},
	// } );

	// Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
	eleventyConfig.addPlugin( eleventyImageTransformPlugin, {
		// Output formats for each image.
		formats: [ 'avif', 'webp', 'auto' ],
		// widths: [ 'auto' ],
		failOnError: false,
		htmlOptions: {
			imgAttributes: {
				// <img loading decoding> assigned on the HTML tag overrides these values.
				loading: 'lazy',
				decoding: 'async',
			},
		},

		sharpOptions: {
			animated: true,
		},
	} );

	eleventyConfig.addPlugin( IdAttributePlugin, {
		// By default we use Eleventy's built-in `slugify` filter:
		// slugify: eleventyConfig.getFilter( 'slugify' ),
		// selector: 'h1,h2,h3,h4,h5,h6', // default
	} );

	// Minify completed pages after other plugins have transformed their HTML.
	eleventyConfig.addPlugin( ( config ) => {
		config.addTransform( 'minify-html', function ( content ) {

			if (
				'string' !== typeof this.page?.outputPath ||
				false === this.page.outputPath.endsWith( '.html' ) ||
				'string' !== typeof content
			) {
				return content;
			}

			return minifyHtml( content, {
				collapseWhitespace: true,
				minifyCSS: false,
				minifyJS: false,
				processScripts: [ 'application/ld+json' ],
				removeComments: true,
				useShortDoctype: true,
			} );
		} );
	} );

	/*
	 * Use this to emulate passthrough copy on the dev server when needed.
	 * https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve
	 */
	// eleventyConfig.setServerPassthroughCopyBehavior( 'passthrough' );
}

export const config = {

	// Control which files Eleventy will process, e.g. *.md, *.njk, *.html, *.liquid
	templateFormats: [
		'md',
		'njk',
		'html',
		'liquid',
		'11ty.js',
	],

	// Pre-process *.md files with: (default: `liquid`)
	markdownTemplateEngine: 'njk',

	// Pre-process *.html files with: (default: `liquid`)
	htmlTemplateEngine: 'njk',

	// These are all optional.
	dir: {
		input: 'content', // default: '.'
		includes: '../_includes', // default: '_includes' (`input` relative)
		data: '../_data', // default: '_data'
		output: '_site',
	},

	/*
	 * If your site deploys to a subdirectory, change `pathPrefix`.
	 * Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix
	 *
	 * When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
	 * it will transform any absolute URLs in your HTML to include this folder name and
	 * does not affect where things go in the output folder.
	 */
	// pathPrefix: '/',
};
