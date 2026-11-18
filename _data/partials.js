import { readdir, stat } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const partialsDirectory = fileURLToPath( new URL( '../_includes/partials/', import.meta.url ) );

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
