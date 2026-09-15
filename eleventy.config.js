/**
 * Configures the Eleventy build.
 *
 * @since Unknown
 */

import {
	HtmlBasePlugin,
	IdAttributePlugin,
	InputPathToUrlTransformPlugin,
} from '@11ty/eleventy';
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img';
import pluginNavigation from '@11ty/eleventy-navigation';
import { feedPlugin } from '@11ty/eleventy-plugin-rss';
import pluginSyntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import metadata from './_data/metadata.js';
import schema from './_data/schema.js';

/**
 * Registers the site's Eleventy configuration.
 *
 * @since Unknown
 * @since September 11, 2026 Adds native Sass template support and file rendering.
 * @since September 15, 2026 Caches compiled Sass results across page renders.
 * @since September 15, 2026 Restores CSS source rendering and removes Sass compilation.
 *
 * @param {object} eleventyConfig Eleventy configuration object.
 */
export default function( eleventyConfig ) {
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

	eleventyConfig
		.addPassthroughCopy( { './public/': '/', } )
		.addPassthroughCopy( './content/feed/pretty-atom-feed.xsl' );

	/**
	 * Run Eleventy when these files change.
	 * https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets
	 */
	eleventyConfig.addWatchTarget( 'content/' );
	eleventyConfig.addWatchTarget( 'css/' );
	eleventyConfig.addWatchTarget( 'js/' );

	/**
	 * Per-page bundles. The bundle plugin collects literal <style> and <script>
	 * blocks from the layouts.
	 * https://github.com/11ty/eleventy-plugin-bundle
	 */
	eleventyConfig.addBundle( 'css', {
		toFileDirectory: 'dist',

		/**
		 * Add all <style> content to the css bundle.
		 * Use <style eleventy:ignore> to opt out.
		 * Supported selectors: https://www.npmjs.com/package/posthtml-match-helper
		 */
		bundleHtmlContentFromSelector: 'style',
	} );

	eleventyConfig.addBundle( 'js', {
		toFileDirectory: 'dist',

		/**
		 * Add all <script> content to the js bundle.
		 * Use <script eleventy:ignore> to opt out.
		 * Supported selectors: https://www.npmjs.com/package/posthtml-match-helper
		 */
		bundleHtmlContentFromSelector: 'script',
	} );

	// Official plugins.
	eleventyConfig.addPlugin( pluginSyntaxHighlight, { preAttributes: { tabindex: 0 } } );
	eleventyConfig.addPlugin( pluginNavigation );
	eleventyConfig.addPlugin( HtmlBasePlugin );
	eleventyConfig.addPlugin( InputPathToUrlTransformPlugin );

	eleventyConfig.addPlugin( feedPlugin, {
		type: 'atom',
		outputPath: '/feed/feed.xml',
		stylesheet: 'pretty-atom-feed.xsl',
		collection: {
			name: 'posts',
			limit: 10,
		},
		metadata: {
			language: metadata.language,
			title: business.name,
			subtitle: business.description,
				base: metadata.url,
			author: {
				name: metadata.author.name,
				email: metadata.author.email,
				url: metadata.author.url,
			},
		},
	} );

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

	/**
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

	/**
	 * If your site deploys to a subdirectory, change `pathPrefix`.
	 * Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix
	 *
	 * When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
	 * it will transform any absolute URLs in your HTML to include this folder name and
	 * does not affect where things go in the output folder.
	 */
	// pathPrefix: '/',
};
