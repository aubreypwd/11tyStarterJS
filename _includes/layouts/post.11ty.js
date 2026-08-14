import { defineArticle } from '@unhead/schema-org';
/**
 * Defines the blog-post layout.
 *
 * @since Unknown
 */
export default class Post {

	/**
	 * CSS file paths keyed by numeric load priority.
	 *
	 * @since August 13, 2026
	 *
	 * @type {object}
	 */
	static styles = {
		10: 'node_modules/prismjs/themes/prism-okaidia.css',
	};

	/**
	 * Provides post layout data and article schema.
	 *
	 * @since Unknown
	 *
	 * @return {object} Post layout data.
	 */
	data() {

		return {
			layout: 'layouts/Base.11ty.js',
			eleventyComputed: {

				/**
				 * Builds article schema for the current post.
				 *
				 * @since Unknown
				 *
				 * @param {object} data Eleventy data cascade.
				 * @return {object} Article schema data.
				 */
				layoutSchema( data ) {
					return {

						// Article Schema for Posts
						Article: defineArticle( {
							headline: data.title ?? '',
							description: data.description ?? data.title ?? '',
							author: {
								name: data.author?.name ?? data.metadata.author.name ?? '',
								url: data.author?.url ?? data.metadata.author.url ?? '',
							},
							datePublished: data.date ?? data.page?.date ?? '',
							dateModified:  data.date ?? data.page?.date ?? '',
						} ),
					};
				},
			},
		};
	}

	/**
	 * Renders a blog post.
	 *
	 * @since Unknown
	 *
	 * @param {object} data Eleventy data cascade.
	 * @return {string} Rendered post content.
	 */
	render( data ) {

		// Content
		return /* html */ `
			<h1>${ data.fn.escHtml( data.title ) }</h1>

			<ul class="PostMetadata">
				<li>
					<time datetime="${ data.fn.escHtml( data.fn.dateToFormat( data.date ?? data.page?.date, 'yyyy-LL-dd' ) ) }">
						${ data.fn.escHtml( data.fn.dateToFormat( data.date ?? data.page?.date, 'LLLL dd, yyyy' ) ) }
					</time>
				</li>

				${ this.renderTagsList( data, data.fn.filterTagList( data.tags || [] ) ) }
			</ul>

			${ data.content }

			${ this.renderPreviousNextLinks( data, data.collections?.posts || [], data.page?.url || '' ) }
		`;
	}

	/**
	 * Turn one tag into a link to its archive page.
	 *
	 * @since Unknown
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {string} tag Tag name.
	 * @return {string} Tag link HTML.
	 */
	renderTagItem( data, tag ) {
		return /* html */ `<a href="${ data.fn.escHtml( `/tags/${ this.slugify( tag ) }/` ) }" class="PostTag">${ data.fn.escHtml( tag ) }</a>`;
	}

	/**
	 * Hide the tag list when a post has no tags.
	 *
	 * @since Unknown
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {array} tags Tag names.
	 * @return {string} Tag list HTML.
	 */
	renderTagsList( data, tags ) {

		if ( ! tags.length ) {
			return ``;
		}

		return tags.map( ( tag, index ) => /* html */ `<li>${ this.renderTagItem( data, tag ) }${ index < tags.length - 1 ? ', ' : '' }</li>` ).join( '' );
	}

	/**
	 * Link to the neighboring posts in the archive.
	 *
	 * @since Unknown
	 *
	 * @param {object} data Eleventy data cascade.
	 * @param {array} posts Post records.
	 * @param {string} currentUrl Current post URL.
	 * @return {string} Previous and next links HTML.
	 */
	renderPreviousNextLinks( data, posts, currentUrl ) {

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
			<ul class="PostNavigation">
				${ previousPost ? /* html */ `<li class="PostNavigation__item PostNavigation__item--previous">← Previous<br> <a href="${ data.fn.escHtml( previousPost.url ) }">${ data.fn.escHtml( previousPost.data?.title || previousPost.url ) }</a></li>` : `` }
				${ nextPost ? /* html */ `<li class="PostNavigation__item PostNavigation__item--next">Next →<br><a href="${ data.fn.escHtml( nextPost.url ) }">${ data.fn.escHtml( nextPost.data?.title || nextPost.url ) }</a></li>` : `` }
			</ul>
		`;
	}
}
