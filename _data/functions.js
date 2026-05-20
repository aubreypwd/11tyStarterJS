import { DateTime } from 'luxon';
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';

const markdownLibrary = markdownIt( {
	html: true,
	breaks: true,
	linkify: true,
} )
	.disable( 'code' )
	.use( markdownItAnchor );

export default function() {
	return {
		dateToFormat: ( date, format ) => {
			return DateTime.fromJSDate( date, { zone: 'utc' } ).toFormat(
				String( format )
			);
		},

		escapeHtml: ( content ) => {
			return String( content ?? '' )
				.replace( /&/g, '&amp;' )
				.replace( /</g, '&lt;' )
				.replace( />/g, '&gt;' )
				.replace( /"/g, '&quot;' )
				.replace( /'/g, '&#39;' );
		},

		filterTagList: ( tags ) => {
			return ( tags || [] ).filter( ( tag ) => {
				return [ 'all', 'nav', 'post', 'posts' ].indexOf( tag ) === -1;
			} );
		},

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
}
