import { readFileSync } from 'node:fs';

import navigationPlugin from '@11ty/eleventy-navigation';

const baseCss = readFileSync( new URL( '../../css/index.css', import.meta.url ), 'utf8' );
const headingAnchorsJs = readFileSync( new URL( '../../node_modules/@zachleat/heading-anchors/heading-anchors.js', import.meta.url ), 'utf8' );

export default class Base {
	renderNavigationItem( entry, currentUrl, functions ) {
		const url = entry.url || entry.data?.page?.url || '';
		const title = entry.title || entry.key || url;

		return /* html */ `
			<li class="nav-item">
				<a href="${ functions.escapeHtml( url ) }"${ url === currentUrl ? ' aria-current="page"' : '' }>${ functions.escapeHtml( title ) }</a>
			</li>
		`;
	}

	renderNavigation( entries, currentUrl, functions ) {
		return /* html */ `
			<ul class="nav">
				${ entries.map( ( entry ) => this.renderNavigationItem( entry, currentUrl, functions ) ).join( '' ) }
			</ul>
		`;
	}

	render( data ) {
		const functions = data.functions;
		const currentUrl = data.page?.url || '';

		return /* html */ `
			<!doctype html>
			<html lang="${ functions.escapeHtml( data.metadata.language ) }">
				<head>
					<meta charset="utf-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>${ functions.escapeHtml( data.title || data.metadata.title ) }</title>
					<meta name="description" content="${ functions.escapeHtml( data.description || data.metadata.description ) }">
					<link rel="alternate" href="/feed/feed.xml" type="application/atom+xml" title="${ functions.escapeHtml( data.metadata.title ) }">

					<!-- The bundle plugin collects literal <style> and <script> blocks from layouts. -->
					<style>${ baseCss }</style>
					<script type="module">${ headingAnchorsJs }</script>

					<style>${ this.getBundle( 'css' ) }</style>
				</head>
				<body>
					<a href="#main" id="skip-link" class="visually-hidden">Skip to main content</a>

					<header>
						<a href="/" class="home-link">${ functions.escapeHtml( data.metadata.title ) }</a>

						<nav>
							<h2 class="visually-hidden">Top level navigation menu</h2>
							${ this.renderNavigation( navigationPlugin.navigation.find( data.collections?.all || [] ), currentUrl, functions ) }
						</nav>
					</header>

					<main id="main">
						<heading-anchors>
							${ data.content }
						</heading-anchors>
					</main>

					<footer>
						<p>
							<em>Built with <a href="https://www.11ty.dev/">${ functions.escapeHtml( data.eleventy?.generator || 'Eleventy' ) }</a></em>
						</p>
					</footer>

					<!-- This page ${ functions.escapeHtml( currentUrl ) } was built on ${ functions.escapeHtml( this.currentBuildDate() ) } -->
					<script type="module" src="${ this.getBundleFileUrl( 'js' ) }"></script>
				</body>
			</html>
		`.trimStart();
	}
}
