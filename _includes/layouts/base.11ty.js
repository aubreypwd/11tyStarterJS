// Node
import { readFileSync } from 'node:fs';

// Navigation
import navigationPlugin from '@11ty/eleventy-navigation';

// Partials
import Head from '../partials/Head.11ty.js';
import Body from '../partials/Body.11ty.js';
import Schema from '../partials/Schema.11ty.js';

export default class Base {
	render( data ) {

		const currentUrl = data.page?.url || '';

		return /* html */ `
			<!doctype html>
			<html lang="${ data.fn.escHtml( data.metadata.language ) }">
				<head>
					<meta charset="utf-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>${ data.fn.escHtml( data.title || data.metadata.title ) }</title>
					<meta name="description" content="${ data.fn.escHtml( data.description || data.metadata.description ) }">
					<link rel="alternate" href="/feed/feed.xml" type="application/atom+xml" title="${ data.fn.escHtml( data.metadata.title ) }">

					${ new Schema().render( data, this ) }

					<!-- The bundle plugin collects literal <style> and <script> blocks from layouts. -->
					<style>${ readFileSync( new URL( '../../css/index.css', import.meta.url ), 'utf8' ) }</style>
					<script type="module">${ readFileSync( new URL( '../../node_modules/@zachleat/heading-anchors/heading-anchors.js', import.meta.url ), 'utf8' ) }</script>
					<style>${ this.getBundle( 'css' ) }</style>

					${ new Head().render( data, this ) }
				</head>
				<body>
					<a href="#main" id="skip-link" class="visually-hidden">Skip to main content</a>

					<header>
						<a href="/" class="home-link">${ data.fn.escHtml( data.metadata.title ) }</a>

						<nav>
							<h2 class="visually-hidden">Top level navigation menu</h2>
							${ this.renderNavigation( navigationPlugin.navigation.find( data.collections?.all || [] ), currentUrl, data.fn ) }
						</nav>
					</header>

					<main id="main">
						<heading-anchors>
							${ data.content }
						</heading-anchors>
					</main>

					<footer>
						<p>
							<em>Built with <a href="https://www.11ty.dev/">${ data.fn.escHtml( data.eleventy?.generator || 'Eleventy' ) }</a></em>
						</p>
					</footer>

					<script type="module" src="${ this.getBundleFileUrl( 'js' ) }"></script>
					${ new Body().render( data, this ) }
				</body>
			</html>
		`
			// Trim the start so we get <DOCTYPE> right away.
			.trimStart();
	}

	/**
	 * Turn one navigation entry into a list item.
	 */
	renderNavigationItem( entry, currentUrl, fn ) {
		const url = entry.url || entry.data?.page?.url || '';

		return /* html */ `
			<li class="nav-item">
				<a href="${ fn.escHtml( url ) }"${ url === currentUrl ? ' aria-current="page"' : '' }>${ fn.escHtml( entry.title || entry.key || url ) }</a>
			</li>
		`;
	}

	/**
	 * Build the header navigation list.
	 */
	renderNavigation( entries, currentUrl, fn ) {
		return /* html */ `
			<ul class="nav">
				${ entries.map( ( entry ) => this.renderNavigationItem( entry, currentUrl, fn ) ).join( '' ) }
			</ul>
		`;
	}
}
