import { defineArticle } from '@unhead/schema-org';
export default class Post {

	data() {

		return {

			layout: 'layouts/Base.11ty.js',

			eleventyComputed: {

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
							dateModified: data.date ?? data.page?.date ?? '',
						} ),
					};
				},
			},
		};
	}

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

	renderTagItem( data, tag ) {
		return /* html */ `<a href="${ data.fn.escHtml( `/tags/${ this.slugify( tag ) }/` ) }" class="PostTag">${ data.fn.escHtml( tag ) }</a>`;
	}

	renderTagsList( data, tags ) {

		if ( ! tags.length ) {
			return ``;
		}

		return tags.map( ( tag, index ) => /* html */ `<li>${ this.renderTagItem( data, tag ) }${ index < tags.length - 1 ? ', ' : '' }</li>` ).join( '' );
	}

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
