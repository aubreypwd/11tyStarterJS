/**
 * Validates Eleventy data for draft content.
 *
 * @since Unknown
 */

import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

/**
 * Creates the project's Eleventy data-schema callback.
 *
 * @since Unknown
 * @since November 10, 2026 Normalizes callback formatting and declaration termination.
 *
 * @return {function} Data validation callback.
 */
export default function () {

	return function ( data ) {

		/* Standard builds may skip drafts in the Eleventy preprocessor. */
		const result = z.object( {
			draft: z.boolean().optional(),
		} ).safeParse( data );

		if ( undefined !== result.error ) {
			throw fromZodError( result.error );
		}
	};
}
