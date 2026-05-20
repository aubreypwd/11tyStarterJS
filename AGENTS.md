# AGENTS.md instructions for /Users/aubreypwd/Sites/11ty/11tyStarterJS

## Commands

- Never use git for any reason.
- Do not use Python for commands, scripts, one-off inspection, parsing, file edits, transformations, or automation.
- Do not write or run non-Bash scripts to examine files or repository contents unless explicitly asked for that exact tool.
- Use Bash for shell work and prefer basic utilities such as `rg`, `sed`, `awk`, `find`, `ls`, `cat`, `head`, `tail`, and `wc`.
- Do not run build commands by default.
- You may run `npm run build` only to test code changes, and only after the user confirms in writing whether or not you can run it for that task.
- Do not run Node checks unless explicitly asked.

## Template Style

- Prefer `*.11ty.js` files for new or modified Eleventy templates, layouts, and includes.
- Keep templates readable and template-first: when possible, have `render()` directly return the HTML template literal.
- Use `data()` in `*.11ty.js` files for template data such as `layout`, `permalink`, and `eleventyNavigation`.
- Put repeated formatting, tag, and markdown helpers in `_data/functions.js` only when this project actually uses them.
- Before adding a helper, check for a real current call site or an immediate near-term need in this project.
- Do not copy helpers from the old project just because they existed there.
- Source the site origin and canonical URL from `_data/metadata.js` instead of hardcoding the same base URL in config or templates.
- Prefer `_data/functions.js` for simple reusable build helpers like `currentBuildDate` instead of adding config shortcodes.
- Remove helpers, filters, and includes when the last real call site is converted away.
- When converting a Nunjucks file to `*.11ty.js`, remove the old file and any support code that becomes unused.
- Use `*.11tydata.js` for shared folder-level post metadata such as tags and layout when several posts share it.
- When converting markdown post bodies to `*.11ty.js`, keep the prose in `render()` and pass it through `data.functions.markdown`.
- When `data.functions.markdown` renders fenced code blocks, wire markdown-it to the syntaxhighlight plugin’s Markdown highlighter so ` ```lang ` fences become Prism HTML automatically.
- In `*.11ty.js` layouts, add CSS and JS with literal `<style>` and `<script>` blocks in the returned HTML so the bundle plugin can collect them, and emit the collected output with `this.getBundle()` or `this.getBundleFileUrl()`.
- Store the base site URL in `_data/metadata.js` without a trailing slash, and add path separators explicitly when composing URLs in templates or helpers.
- Avoid single-use variables when the expression is clear enough inline inside the template.
- Avoid precomputing values only used once in `render()`.
- Do not create helper methods just to rename a simple value, fallback, or ternary.
- Use helper methods only when they render a meaningful chunk, perform a non-trivial transformation, or handle branching that is too complex to read inline.
- Do not reduce everything into one large `render()` when named class methods improve readability.
- Add shared escaping helpers to `_data/functions.js` only when multiple templates need them and there is a real call site.
- Prefix returned template literals with an appropriate language comment, such as `/* html */`, `/* css */`, `/* xml */`, or `/* txt */`.

## Eleventy Data Flow

- Eleventy automatically passes the merged cascade `data` object only to templates and layouts that Eleventy itself renders.
- Layouts receive rendered child content as `data.content`; use that rather than manually calling child templates.

## Template Literal Formatting

- For short one-line fragments, keep the template literal inline.
- For multiline blocks, put the opening backtick on the return line and start the content on the next line.
- In multiline template literals, indent the HTML under the opening backtick and nest child HTML normally.
- Put the closing HTML tag on its own line.
- Put the closing backtick on the next line after the closing HTML tag.

## JavaScript Formatting

- Follow WordPress Coding Standards as closely as practical for JavaScript style.
- Use tabs for indentation.
- Include spaces inside function call parentheses and conditional expressions, for example `render( data )` and `${ post.url === currentUrl ? ' active' : '' }`.
- Use single quotes for simple JavaScript strings and string comparisons.
- Use template literals for content strings that might plausibly contain both single and double quotes, contractions, quoted phrases, or interpolation.
- When writing JavaScript code inside an outer template literal, escape any inner JavaScript template literal backticks so the outer template is not terminated early.
- Do not use double quotes for JavaScript strings unless there is a specific reason.
- Use consecutive `//` comment lines for toggleable examples or options that may be uncommented later; use `/* ... */` for explanatory prose and longer documentation.
- Keep `/* html */` on nested HTML fragments too, including inline fallback HTML such as `<code>`.

## Frontend Direction

- Prefer vanilla CSS and vanilla JavaScript.
- Do not introduce Sass, preprocessors, compilers, or bundlers unless explicitly requested.
