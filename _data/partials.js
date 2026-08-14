/**
 * Registers class-based partials as global Eleventy template data.
 *
 * This asynchronous global data module discovers the top-level `.11ty.js`
 * files in `_includes/partials/`, imports their default classes, validates
 * their `render()` contract, and instantiates each class for the registry.
 * The returned object becomes `data.partials`, with keys derived from each
 * filename without the `.11ty.js` suffix.
 *
 * Templates consume the registry as
 * `data.partials.PartialName.render( data, context, ...args )`. The
 * modification-time query on each dynamic import keeps development edits
 * from reusing a stale Node module. Keep the Eleventy development process
 * watcher on `_includes/` when this pattern is copied to the parent starter.
 *
 * @since August 13, 2026
 *
 * @see https://www.11ty.dev/docs/data-global/
 * @see https://www.11ty.dev/docs/data-js/
 */

import { readdir, stat } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const partialsDirectory = fileURLToPath( new URL( '../_includes/partials/', import.meta.url ) );

/**
 * Discovers and instantiates the site's reusable partials.
 *
 * @since August 13, 2026
 * @since August 13, 2026 Uses a named global data function.
 *
 * @return {Promise} Instantiated partials keyed by filename.
 */
export default async function getPartials() {

	const partialFiles = ( await readdir( partialsDirectory, { withFileTypes: true } ) )
		.filter( ( file ) => file.isFile() && file.name.endsWith( '.11ty.js' ) )
		.sort( ( first, second ) => first.name.localeCompare( second.name ) );

	return Object.fromEntries( await Promise.all( partialFiles.map( loadPartial ) ) );
}

/**
 * Loads and instantiates one partial class.
 *
 * @since August 13, 2026
 * @since August 13, 2026 Validates discovered entries before loading partials.
 *
 * @param {object} file Discovered partial file entry.
 * @return {Promise} A partial registry entry.
 */
async function loadPartial( file ) {

	if ( null === file || 'object' !== typeof file ) {
		throw new TypeError( `Partial file entries must be objects.` );
	}

	const partialPath = join( partialsDirectory, file.name );

	const partialStats = await stat( partialPath ); // await

	// Use the file modification time to refresh edited partial modules.
	const partialModule = await import(
		`${ pathToFileURL( partialPath ).href }?mtime=${ partialStats.mtimeMs }` );

	const Partial = partialModule.default;

	if ( 'function' !== typeof Partial || 'function' !== typeof Partial.prototype?.render ) {
		throw new TypeError( `Partial ${ partialPath } must export a class with a render() method.` );
	}

	return [ basename( file.name, '.11ty.js' ), new Partial() ];
}
