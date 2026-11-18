import { readFileSync } from 'node:fs';
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { DateTime } from 'luxon';
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import markdownPrismJsOptions from '@11ty/eleventy-plugin-syntaxhighlight/src/markdownSyntaxHighlightOptions.js';

import { JSDOM } from 'jsdom';

const markdownLibrary = markdownIt( {
	html: true,
	breaks: true,
	linkify: true,
	highlight: markdownPrismJsOptions(),
} )
	.disable( 'code' )
	.use( markdownItAnchor );

const projectDirectory = fileURLToPath( new URL( '../', import.meta.url ) );
const templateDocument = new JSDOM().window.document;

let discoveredTemplateFiles = [];

export default {

	dateToFormat( date, format ) {
		return DateTime.fromJSDate( date, { zone: 'utc' } ).toFormat(
			String( format )
		);
	},

	isNetlify() {
		return 'true' === process.env.NETLIFY;
	},

	isProduction() {
		return 'production' === process.env.CONTEXT;
	},

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

	async importTemplate( templatePath ) {

		const templateModule = await import(
			`${ pathToFileURL( templatePath ).href }?mtime=${ ( await stat( templatePath ) ).mtimeMs }`
		);

		if ( 'function' !== typeof templateModule.default ) {
			throw new TypeError( `Template ${ templatePath } must export a class.` );
		}

		return templateModule.default;
	},

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

	async getTemplateRegistry( data ) {

		if ( data.templateAssetRegistry ) {
			return data.templateAssetRegistry;
		}

		data.templateAssetRegistry = await this.collectTemplateRegistry();

		return data.templateAssetRegistry;
	},

	escHtml( content ) {
		return String( content ?? '' )
			.replace( /&/g, '&amp;' )
			.replace( /</g, '&lt;' )
			.replace( />/g, '&gt;' )
			.replace( /"/g, '&quot;' )
			.replace( /'/g, '&#39;' );
	},

	escStringToDashes( value ) {

		if ( 'string' !== typeof value ) {
			return '';
		}

		let sanitized = value.replace( /<[^>]*>/g, '' );

		// Preserve percent-encoded octets while removing stray percent signs.
		sanitized = sanitized.replace( /%([a-f0-9]{2})/gi, '---$1---' );
		sanitized = sanitized.replace( /%/g, '' );
		sanitized = sanitized.replace( /---([a-f0-9]{2})---/gi, '%$1' );

		sanitized = sanitized.replace( /[^\u0000-\u007f]+/g, function ( characters ) {
			return encodeURIComponent( characters );
		} ).toLowerCase();

		return sanitized
			.replace( /&.+?;/g, '' )
			.replace( /\./g, '-' )
			.replace( /[^%a-z0-9 _-]/g, '' )
			.replace( /\s+/g, '-' )
			.replace( /-+/g, '-' )
			.replace( /^-+|-+$/g, '' );
	},

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

	filterTagList( tags ) {
		return ( tags || [] ).filter( function ( tag ) {
			return [ 'all', 'nav', 'post', 'posts' ].indexOf( tag ) === -1;
		} );
	},

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

	printFile( path, data, once = false ) {

		// There is no reason to output styles more than once.
		once = path.endsWith( '.css' ) ? true : once;

		const fileUrl = new URL( path, new URL( '../', import.meta.url ) );

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

	async renderStyles( data ) {

		const registry = await this.getTemplateRegistry( data );

		return registry.styles.map( function ( style ) {
			return this.renderStyle( style.path, data );
		}, this ).join( '' );
	},

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

	async renderScripts( data ) {

		const registry = await this.getTemplateRegistry( data );

		return registry.scripts.map( function ( script ) {
			return this.renderScript( script.path, data );
		}, this ).join( '' );
	},

	labTitle( data, title ) {

		if ( null === data || 'object' !== typeof data ) {
			return '';
		}

		return `${ title } in ${ data.schema.localBusiness.address.addressLocality }, ${ data.schema.localBusiness.address.addressRegion } ${ data.settings.titleSeparator } ${ data.schema.localBusiness.name }`;
	},

	createElement( element, content, attributes = {}, options = {} ) {

		const el = templateDocument.createElement( element );

		// Add attributes.
		for ( const [ name, value ] of Object.entries( attributes ) ) {
			el.setAttribute( name, value );
		}

		// Add umami tracking to the el.
		if ( options.hasOwnProperty( 'umami' ) ) {

			for ( const [ name, value ] of Object.entries( options.umami ?? {} ) ) {
				el.setAttribute( `data-umami-${ name }`, value );
			}

			el.setAttribute( 'data-umami-event', options.umami?.event || 'Unknown' );
		}

		el.innerHTML = content;

		return el.outerHTML;
	}
};
