import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

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
