/**
 * Validates Eleventy data for draft content.
 *
 * @since Unknown
 */

import { z } from "zod";
import { fromZodError } from 'zod-validation-error';

// Draft content, validate `draft` front matter
/**
 * Creates the project's Eleventy data-schema callback.
 *
 * @since Unknown
 *
 * @return {Function} Data validation callback.
 */
export default function() {
	return function(data) {
		// Note that drafts may be skipped in a preprocessor (see eleventy.config.js)
		// when doing a standard build (not --serve or --watch)
		let result = z.object({
			draft: z.boolean().optional(),
		}).safeParse(data);

		if(result.error) {
			throw fromZodError(result.error);
		}
	}
}
