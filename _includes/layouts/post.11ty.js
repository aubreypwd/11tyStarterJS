import { readFileSync } from 'node:fs';

import { defineArticle } from '@unhead/schema-org';

const prismThemeCss = readFileSync( new URL( '../../node_modules/prismjs/themes/prism-okaidia.css', import.meta.url ), 'utf8' );
const prismDiffCss = readFileSync( new URL( '../../css/prism-diff.css', import.meta.url ), 'utf8' );

export default class Post {

	// Data
	data() {
		return {
			layout: 'layouts/Base.11ty.js',
			eleventyComputed: {

				/**
				 * Build the Article schema for this post.
				 */
				layoutSchema( data ) {
					return {
						Article: defineArticle( {
							headline: data.title,
							description: data.description || data.metadata.description,
							author: {
								name: data.metadata.author.name,
								url: data.metadata.author.url,
							},
							datePublished: data.page?.date || data.date,
							dateModified: data.page?.date || data.date,
						} ),
					};
				},
			},
		};
	}

	// Render
	render( data ) {

		this.fn = data.fn;

		// Prefer Eleventy’s page date when it exists, otherwise use the post date.
		const date = data.page?.date || data.date;

		return /* html */ `
			<style>${ prismThemeCss }</style>
			<style>${ prismDiffCss }</style>

			<h1>${ this.fn.escHtml( data.title ) }</h1>

			<ul class="post-metadata">
				<li><time datetime="${ this.fn.escHtml( this.fn.dateToFormat( date, 'yyyy-LL-dd' ) ) }">${ this.fn.escHtml( this.fn.dateToFormat( date, 'LLLL yyyy' ) ) }</time></li>
				${ this.renderTagsList( this.fn.filterTagList( data.tags || [] ) ) }
			</ul>

			${ data.content }

			${ this.renderPreviousNextLinks( data.collections?.posts || [], data.page?.url || '' ) }
		`;
	}

	/**
	 * Turn one tag into a link to its archive page.
	 */
	renderTagItem( tag ) {
		return /* html */ `
			<a href="${ this.fn.escHtml( `/tags/${ this.slugify( tag ) }/` ) }" class="post-tag">${ this.fn.escHtml( tag ) }</a>
		`;
	}

	/**
	 * Hide the tag list when a post has no tags.
	 */
	renderTagsList( tags ) {
		if ( ! tags.length ) {
			return '';
		}

		return tags.map( ( tag, index ) => {
			return /* html */ `
				<li>${ this.renderTagItem( tag ) }${ index < tags.length - 1 ? ', ' : '' }</li>
			`;
		} ).join( '' );
	}

	/**
	 * Link to the neighboring posts in the archive.
	 */
	renderPreviousNextLinks( posts, currentUrl ) {
		const currentIndex = posts.findIndex( ( post ) => post.url === currentUrl );

		if ( currentIndex === -1 ) {
			return '';
		}

		const previousPost = currentIndex > 0 ? posts[ currentIndex - 1 ] : undefined;
		const nextPost = currentIndex < posts.length - 1 ? posts[ currentIndex + 1 ] : undefined;

		if ( ! previousPost && ! nextPost ) {
			return '';
		}

		return /* html */ `
			<ul class="links-nextprev">
				${ previousPost ? /* html */ `
					<li class="links-nextprev-prev">← Previous<br> <a href="${ this.fn.escHtml( previousPost.url ) }">${ this.fn.escHtml( previousPost.data?.title || previousPost.url ) }</a></li>
				` : '' }
				${ nextPost ? /* html */ `
					<li class="links-nextprev-next">Next →<br><a href="${ this.fn.escHtml( nextPost.url ) }">${ this.fn.escHtml( nextPost.data?.title || nextPost.url ) }</a></li>
				` : '' }
			</ul>
		`;
	}
}
