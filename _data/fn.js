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

export default {

	/**
	 * Format a date in UTC.
	 *
	 * @param {Date} date Date object to format.
	 * @param {string} format Date format string.
	 * @return {string} Formatted date string.
	 */
	dateToFormat: ( date, format ) => {
		return DateTime.fromJSDate( date, { zone: 'utc' } ).toFormat(
			String( format )
		);
	},

	/**
	 * Get the current ISO timestamp.
	 *
	 * @return {string} Current ISO timestamp.
	 */
	currentBuildDate: () => {
		return new Date().toISOString();
	},

	/**
	 * Escape text for safe HTML output.
	 *
	 * @param {string|number|null|undefined} content Content to escape.
	 * @return {string} Escaped HTML string.
	 */
	escHtml: ( content ) => {
		return String( content ?? '' )
			.replace( /&/g, '&amp;' )
			.replace( /</g, '&lt;' )
			.replace( />/g, '&gt;' )
			.replace( /"/g, '&quot;' )
			.replace( /'/g, '&#39;' );
	},

	/**
	 * Remove Eleventy reserved tags from a tag list.
	 *
	 * @param {Array<string>} tags Tag list to filter.
	 * @return {Array<string>} Filtered tag list.
	 */
	filterTagList: ( tags ) => {
		return ( tags || [] ).filter( ( tag ) => {
			return [ 'all', 'nav', 'post', 'posts' ].indexOf( tag ) === -1;
		} );
	},

	/**
	 * Render Markdown as HTML.
	 *
	 * @param {string} content Markdown content to render.
	 * @param {Object} [options={}] Markdown rendering options.
	 * @param {boolean} [options.tabbedIn=true] Strip leading tabs before rendering.
	 * @return {string} Rendered HTML.
	 */
	markdown: ( content, options = {} ) => {
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
};
