/**
 * Registers class-based partials as global Eleventy template data.
 *
 * This asynchronous global data module discovers `.11ty.js` files throughout
 * `_includes/partials/`, imports their default classes, validates their
 * `render()` contract, and instantiates each class for the registry.
 * The returned object becomes `data.partials`, with keys derived from each
 * filename without the `.11ty.js` suffix.
 *
 * Templates consume each registered partial with
 * `data.partials.PartialName.render( data, context, options )`. The caller
 * decides whether to invoke each partial and passes partial-specific settings
 * through the third options argument. Section requires `options.name` for its
 * root classes and generated ID. Its `containerVariation` and
 * `contentVariation` options control the two wrapper variations. It also
 * accepts rendered HTML as a fourth argument for its content slot. The
 * SectionHeader requires `options.name` and `options.content`, accepts an
 * optional `options.eyebrow` with a built-in `eyebrow` class, and uses
 * `options.tag` for its heading element. It also supports custom header and
 * heading classes. The modification-time query on each dynamic import keeps
 * development edits from reusing a stale Node module.
 * Keep the Eleventy development process watcher on `_includes/` when this
 * pattern is copied to the parent starter.
 *
 * @since August 13, 2026
 * @since October 29, 2026 Uses explicit render options for partial settings.
 * @since October 29, 2026 Discovers partials in nested category folders.
 * @since November 2, 2026 Supports a content slot in the Section partial.
 * @since November 2, 2026 Requires a Section name for generated classes and IDs.
 * @since November 2, 2026 Documents Section wrapper variation options.
 * @since November 2, 2026 Documents the SectionHeader component options.
 * @since November 2, 2026 Uses SectionHeader content and tag options.
 *
 * @see https://www.11ty.dev/docs/data-global/
 * @see https://www.11ty.dev/docs/data-js/
 */

import { readdir, stat } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const partialsDirectory = fileURLToPath( new URL( '../_includes/partials/', import.meta.url ) );

/**
 * Discovers and instantiates the site's partials.
 *
 * @since August 13, 2026
 * @since August 13, 2026 Uses a named global data function.
 *
 * @return {Promise} Instantiated partials keyed by filename.
 */
export default async function getPartials() {

	async function getPartialFiles( directory ) {

		const entries = await readdir( directory, { withFileTypes: true } );
		const nestedPaths = await Promise.all( entries.map( async ( entry ) => {

			const entryPath = join( directory, entry.name );

			if ( entry.isDirectory() ) {
				return getPartialFiles( entryPath );
			}

			if ( false === entry.isFile() || false === entry.name.endsWith( '.11ty.js' ) ) {
				return [];
			}

			return [ entryPath ];
		} ) );

		return nestedPaths.flat();
	}

	const partialFiles = ( await getPartialFiles( partialsDirectory ) )
		.sort( ( first, second ) => basename( first ).localeCompare( basename( second ) ) );

	return Object.fromEntries( await Promise.all( partialFiles.map( loadPartial ) ) );
}

/**
 * Loads and instantiates one partial class.
 *
 * @since August 13, 2026
 * @since August 13, 2026 Validates discovered entries before loading partials.
 * @since October 29, 2026 Loads nested partial file paths.
 *
 * @param {string} partialPath Discovered partial file path.
 * @return {Promise} A partial registry entry.
 */
async function loadPartial( partialPath ) {

	if ( 'string' !== typeof partialPath ) {
		throw new TypeError( `Partial file paths must be strings.` );
	}

	const partialStats = await stat( partialPath ); // await

	// Use the file modification time to refresh edited partial modules.
	const partialModule = await import(
		`${ pathToFileURL( partialPath ).href }?mtime=${ partialStats.mtimeMs }` );

	const Partial = partialModule.default;

	if ( 'function' !== typeof Partial || 'function' !== typeof Partial.prototype?.render ) {
		throw new TypeError( `Partial ${ partialPath } must export a class with a render() method.` );
	}

	return [ basename( partialPath, '.11ty.js' ), new Partial() ];
}
