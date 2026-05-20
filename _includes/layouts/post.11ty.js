import { readFileSync } from 'node:fs';

const prismThemeCss = readFileSync( new URL( '../../node_modules/prismjs/themes/prism-okaidia.css', import.meta.url ), 'utf8' );
const prismDiffCss = readFileSync( new URL( '../../css/prism-diff.css', import.meta.url ), 'utf8' );

export default class Post {
	data() {
		return {
			layout: 'layouts/base.11ty.js',
		};
	}

	renderTagItem( tag, functions ) {
		const tagUrl = `/tags/${ this.slugify( tag ) }/`;

		return /* html */ `
			<a href="${ functions.escapeHtml( tagUrl ) }" class="post-tag">${ functions.escapeHtml( tag ) }</a>
		`;
	}

	renderTagsList( tags, functions ) {
		if ( ! tags.length ) {
			return '';
		}

		return tags.map( ( tag, index ) => {
			return /* html */ `
				<li>${ this.renderTagItem( tag, functions ) }${ index < tags.length - 1 ? ', ' : '' }</li>
			`;
		} ).join( '' );
	}

	renderPreviousNextLinks( posts, currentUrl, functions ) {
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
					<li class="links-nextprev-prev">← Previous<br> <a href="${ functions.escapeHtml( previousPost.url ) }">${ functions.escapeHtml( previousPost.data?.title || previousPost.url ) }</a></li>
				` : '' }
				${ nextPost ? /* html */ `
					<li class="links-nextprev-next">Next →<br><a href="${ functions.escapeHtml( nextPost.url ) }">${ functions.escapeHtml( nextPost.data?.title || nextPost.url ) }</a></li>
				` : '' }
			</ul>
		`;
	}

	render( data ) {
		const functions = data.functions;
		const tags = functions.filterTagList( data.tags || [] );
		const date = data.page?.date || data.date;
		const posts = data.collections?.posts || [];

		return /* html */ `
			<style>${ prismThemeCss }</style>
			<style>${ prismDiffCss }</style>

			<h1>${ functions.escapeHtml( data.title ) }</h1>

			<ul class="post-metadata">
				<li><time datetime="${ functions.escapeHtml( functions.dateToFormat( date, 'yyyy-LL-dd' ) ) }">${ functions.escapeHtml( functions.dateToFormat( date, 'LLLL yyyy' ) ) }</time></li>
				${ this.renderTagsList( tags, functions ) }
			</ul>

			${ data.content }

			${ this.renderPreviousNextLinks( posts, data.page?.url || '', functions ) }
		`;
	}
}
