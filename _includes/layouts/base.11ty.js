import { readFileSync } from 'node:fs';

import navigationPlugin from '@11ty/eleventy-navigation';
import { defineWebPage, defineWebSite } from '@unhead/schema-org';

import SchemaOrg from '../SchemaOrg.11ty.js';

export default class Base {
	/**
	 * Turn one navigation entry into a list item.
	 */
	renderNavigationItem( entry, currentUrl, functions ) {
		const url = entry.url || entry.data?.page?.url || '';

		return /* html */ `
			<li class="nav-item">
				<a href="${ functions.escapeHtml( url ) }"${ url === currentUrl ? ' aria-current="page"' : '' }>${ functions.escapeHtml( entry.title || entry.key || url ) }</a>
			</li>
		`;
	}

	/**
	 * Build the header navigation list.
	 */
	renderNavigation( entries, currentUrl, functions ) {
		return /* html */ `
			<ul class="nav">
				${ entries.map( ( entry ) => this.renderNavigationItem( entry, currentUrl, functions ) ).join( '' ) }
			</ul>
		`;
	}

	render( data ) {
		const currentUrl = data.page?.url || '';

		return /* html */ `
			<!doctype html>
			<html lang="${ data.functions.escapeHtml( data.metadata.language ) }">
				<head>
					<meta charset="utf-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>${ data.functions.escapeHtml( data.title || data.metadata.title ) }</title>
					<meta name="description" content="${ data.functions.escapeHtml( data.description || data.metadata.description ) }">
					<link rel="alternate" href="/feed/feed.xml" type="application/atom+xml" title="${ data.functions.escapeHtml( data.metadata.title ) }">

					${ new SchemaOrg().render( data, {
						WebSite: defineWebSite( {
							name: data.metadata.title,
							description: data.metadata.description,
							inLanguage: data.metadata.language,
							url: data.metadata.url,
						} ),
						WebPage: defineWebPage( {
							name: data.title || data.metadata.title,
							description: data.description || data.metadata.description,
							inLanguage: data.metadata.language,
							url: new URL( data.page?.url || '/', data.metadata.url ).href,
						} ),
						...( data.layoutSchema || {} ),
						...( data.pageSchema || {} ),
					} ) }

					<!-- The bundle plugin collects literal <style> and <script> blocks from layouts. -->
					<style>${ readFileSync( new URL( '../../css/index.css', import.meta.url ), 'utf8' ) }</style>
					<script type="module">${ readFileSync( new URL( '../../node_modules/@zachleat/heading-anchors/heading-anchors.js', import.meta.url ), 'utf8' ) }</script>
					<style>${ this.getBundle( 'css' ) }</style>
				</head>
				<body>
					<a href="#main" id="skip-link" class="visually-hidden">Skip to main content</a>

					<header>
						<a href="/" class="home-link">${ data.functions.escapeHtml( data.metadata.title ) }</a>

						<nav>
							<h2 class="visually-hidden">Top level navigation menu</h2>
							${ this.renderNavigation( navigationPlugin.navigation.find( data.collections?.all || [] ), currentUrl, data.functions ) }
						</nav>
					</header>

					<main id="main">
						<heading-anchors>
							${ data.content }
						</heading-anchors>
					</main>

					<footer>
						<p>
							<em>Built with <a href="https://www.11ty.dev/">${ data.functions.escapeHtml( data.eleventy?.generator || 'Eleventy' ) }</a></em>
						</p>
					</footer>

					<script type="module" src="${ this.getBundleFileUrl( 'js' ) }"></script>
				</body>
			</html>
		`.trimStart();
	}
}
