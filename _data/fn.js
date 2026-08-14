/**
 * Provides shared data and rendering helpers.
 *
 * @since Unknown
 */

import { readFileSync } from 'node:fs';
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { DateTime } from 'luxon';
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import markdownPrismJsOptions from '@11ty/eleventy-plugin-syntaxhighlight/src/markdownSyntaxHighlightOptions.js';

const markdownLibrary = markdownIt( {
	html: true,
	breaks: true,
	linkify: true,
	highlight: markdownPrismJsOptions(),
} )
	.disable( 'code' )
	.use( markdownItAnchor );

const projectDirectory = fileURLToPath( new URL( '../', import.meta.url ) );

let discoveredTemplateFiles = [];

export default {

	/**
	 * Format a date in UTC.
	 *
	 * @since Unknown
	 *
	 * @param {Date} date Date object to format.
	 * @param {string} format Date format string.
	 * @return {string} Formatted date string.
	 */
	dateToFormat( date, format ) {
		return DateTime.fromJSDate( date, { zone: 'utc' } ).toFormat(
			String( format )
		);
	},

	/**
	 * Get the current ISO timestamp.
	 *
	 * @since Unknown
	 *
	 * @return {string} Current ISO timestamp.
	 */
	currentBuildDate() {
		return new Date().toISOString();
	},

	/**
	 * Finds JavaScript templates within one directory.
	 *
	 * @since August 13, 2026
	 *
	 * @param {string} directory Absolute directory path to search.
	 * @return {Promise} Template file paths in discovery order.
	 */
	async findTemplateFiles( directory ) {

		const templateFiles = [];

		for ( const entry of await readdir( directory, { withFileTypes: true } ) ) {

			const entryPath = join( directory, entry.name );

			if ( entry.isDirectory() ) {
				templateFiles.push( ...await this.findTemplateFiles( entryPath ) );
				continue;
			}

			if ( entry.isFile() && entry.name.endsWith( '.11ty.js' ) ) {
				templateFiles.push( entryPath );
			}
		}

		return templateFiles;
	},

	/**
	 * Gets the discovered template file paths.
	 *
	 * @since August 13, 2026
	 *
	 * @return {Promise} Cached template file paths.
	 */
	async getTemplateFiles() {

		if ( 0 < discoveredTemplateFiles.length ) {
			return discoveredTemplateFiles;
		}

		const foundTemplateFiles = [];

		for ( const directory of [ 'content', '_includes' ] ) {
			foundTemplateFiles.push( ...await this.findTemplateFiles( join( projectDirectory, directory ) ) );
		}

		discoveredTemplateFiles = foundTemplateFiles;

		return discoveredTemplateFiles;
	},

	/**
	 * Imports one JavaScript template with its current modification time.
	 *
	 * @since August 13, 2026
	 *
	 * @param {string} templatePath Absolute template file path.
	 * @return {Promise} Template class.
	 */
	async importTemplate( templatePath ) {

		const templateModule = await import(
			`${ pathToFileURL( templatePath ).href }?mtime=${ ( await stat( templatePath ) ).mtimeMs }`
		);

		if ( 'function' !== typeof templateModule.default ) {
			throw new TypeError( `Template ${ templatePath } must export a class.` );
		}

		return templateModule.default;
	},

	/**
	 * Collects styles and scripts declared by template classes.
	 *
	 * @since August 13, 2026
	 *
	 * @return {Promise} Priority-ordered style and script registries.
	 */
	async collectTemplateRegistry() {

		const registry = {
			styles: [],
			scripts: [],
		};

		const registeredPaths = {
			styles: new Set(),
			scripts: new Set(),
		};

		for ( const templatePath of await this.getTemplateFiles() ) {

			const Template = await this.importTemplate( templatePath );

			for ( const property of [ 'styles', 'scripts' ] ) {

				const assets = Template[ property ];

				if ( undefined === assets ) {
					continue;
				}

				if ( null === assets || 'object' !== typeof assets || Array.isArray( assets ) ) {
					throw new TypeError( `Template ${ templatePath } ${ property } must be a priority-to-path object.` );
				}

				for ( const [ priority, path ] of Object.entries( assets ) ) {

					if ( '' === priority.trim() || false === Number.isFinite( Number( priority ) ) ) {
						throw new TypeError( `Template ${ templatePath } has an invalid ${ property } priority.` );
					}

					if ( 'string' !== typeof path ) {
						throw new TypeError( `Template ${ templatePath } ${ property } must declare file paths as strings.` );
					}

					if ( registeredPaths[ property ].has( path ) ) {
						continue;
					}

					registeredPaths[ property ].add( path );

					registry[ property ].push( {
						priority: Number( priority ),
						path,
					} );
				}
			}
		}

		for ( const property of [ 'styles', 'scripts' ] ) {
			registry[ property ].sort( function ( first, second ) {
				return first.priority - second.priority;
			} );
		}

		return registry;
	},

	/**
	 * Gets the current render's template asset registry.
	 *
	 * @since August 13, 2026
	 *
	 * @param {object} data Eleventy template data.
	 * @return {Promise} Cached style and script registries.
	 */
	async getTemplateRegistry( data ) {

		if ( data.templateAssetRegistry ) {
			return data.templateAssetRegistry;
		}

		data.templateAssetRegistry = await this.collectTemplateRegistry();

		return data.templateAssetRegistry;
	},

	/**
	 * Escape text for safe HTML output.
	 *
	 * @since Unknown
	 *
	 * @param {string} content Content to escape.
	 * @return {string} Escaped HTML string.
	 */
	escHtml( content ) {
		return String( content ?? '' )
			.replace( /&/g, '&amp;' )
			.replace( /</g, '&lt;' )
			.replace( />/g, '&gt;' )
			.replace( /"/g, '&quot;' )
			.replace( /'/g, '&#39;' );
	},

	/**
	 * Format a North American telephone number for visible text.
	 *
	 * @since July 31, 2026
	 *
	 * @param {string} telephone Telephone number from LocalBusiness schema.
	 * @return {string} Human-readable telephone number.
	 */
	formatPhone( telephone ) {

		if ( 'string' !== typeof telephone ) {
			return '';
		}

		const digits = telephone.replace( /\D/g, '' );

		if ( 11 === digits.length && '1' === digits[0] ) {
			return `(${ digits.slice( 1, 4 ) }) ${ digits.slice( 4, 7 ) }-${ digits.slice( 7 ) }`;
		}

		if ( 10 === digits.length ) {
			return `(${ digits.slice( 0, 3 ) }) ${ digits.slice( 3, 6 ) }-${ digits.slice( 6 ) }`;
		}

		return telephone;
	},

	/**
	 * Remove Eleventy reserved tags from a tag list.
	 *
	 * @since Unknown
	 *
	 * @param {array} tags Tag list to filter.
	 * @return {array} Filtered tag list.
	 */
	filterTagList( tags ) {
		return ( tags || [] ).filter( function ( tag ) {
			return [ 'all', 'nav', 'post', 'posts' ].indexOf( tag ) === -1;
		} );
	},

	/**
	 * Render Markdown as HTML.
	 *
	 * @since Unknown
	 *
	 * @param {string} content Markdown content to render.
	 * @param {object} options Markdown rendering options.
	 * @return {string} Rendered HTML.
	 */
	markdown( content, options = {} ) {
		options = Object.assign(
			{
				tabbedIn: true,
			},
			options
		);

		if ( options.tabbedIn ) {
			return markdownLibrary.render(
				String( content || '' )
					.trim()

					// Assume markdown is tabbed in and remove it.
					.replace( /^\t+/gm, '' )
			);
		}

		// Assume proper markdown.
		return markdownLibrary.render( String( content || '' ) );
	},

	/**
	 * Read a file as text.
	 *
	 * @since Unknown
	 *
	 * @param {string} path Relative file path.
	 * @param {object} data Template data object.
	 * @param {boolean} [once=false] Only print this file one time per render.
	 * @return {string} File contents.
	 */
	printFile( path, data, once = false ) {

		// There is no reason to output CSS more than once.
		once = path.includes( '.css' ) ? true : once;

		const fileUrl = new URL( path, import.meta.url );

		data.printedFiles = data.printedFiles || [];

		if ( once && data.printedFiles.includes( fileUrl.href ) ) {
			return ''; // Since once was true, do not re-render this file out.
		}

		if ( ! data.printedFiles.includes( fileUrl.href ) ) {

			// Always keep track of files we render out, that way if future once is true, we won't re-print it.
			data.printedFiles.push( fileUrl.href );
		}

		return readFileSync( fileUrl, 'utf8' );
	},

	/**
	 * Renders a CSS file in a style tag.
	 *
	 * @since August 13, 2026
	 *
	 * @param {string} path Relative CSS file path.
	 * @param {object} data Template data object.
	 * @return {string} Style tag containing the CSS file.
	 */
	renderStyle( path, data ) {

		if ( 'string' !== typeof path || false === path.endsWith( '.css' ) ) {
			return '';
		}

		const css = this.printFile( path, data );

		if ( '' === css ) {
			return '';
		}

		return /* html */ `<style>${ css }</style>`;
	},

	/**
	 * Renders all CSS declared by template classes.
	 *
	 * @since August 13, 2026
	 *
	 * @param {object} data Eleventy template data.
	 * @return {Promise} Style tags for the template CSS registry.
	 */
	async renderStyles( data ) {

		const registry = await this.getTemplateRegistry( data );

		return registry.styles.map( function ( style ) {
			return this.renderStyle( `../${ style.path }`, data );
		}, this ).join( '' );
	},

	/**
	 * Renders a JavaScript file in a module script tag.
	 *
	 * @since August 13, 2026
	 *
	 * @param {string} path Relative JavaScript file path.
	 * @param {object} data Template data object.
	 * @return {string} Script tag containing the JavaScript file.
	 */
	renderScript( path, data ) {

		if ( 'string' !== typeof path || false === path.endsWith( '.js' ) ) {
			return '';
		}

		const javascript = this.printFile( path, data, true );

		if ( '' === javascript ) {
			return '';
		}

		return /* html */ `<script type="module">${ javascript }</script>`;
	},

	/**
	 * Renders all JavaScript declared by template classes.
	 *
	 * @since August 13, 2026
	 *
	 * @param {object} data Eleventy template data.
	 * @return {Promise} Script tags for the template JavaScript registry.
	 */
	async renderScripts( data ) {

		const registry = await this.getTemplateRegistry( data );

		return registry.scripts.map( function ( script ) {
			return this.renderScript( `../${ script.path }`, data );
		}, this ).join( '' );
	},

	/**
	 * Get a service category title.
	 *
	 * @since August 10, 2026
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {string} category The name of the GBP service category.
	 * @return {string} Service category title.
	 */
	serviceCategoryTitle( data, category ) {
		return `${ category } in ${ data.schema.localBusiness.address.addressLocality }, ${ data.schema.localBusiness.address.addressRegion } ${ data.metadata.settings.titleSeparator } ${ data.schema.localBusiness.name }`;
	}
};
