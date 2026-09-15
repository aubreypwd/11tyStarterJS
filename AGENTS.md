# AGENTS.md instructions for /Users/aubreypwd/Sites/11ty/11tyStarterJS

## Commands

- Never use git for any reason.
- Do not use Python for commands, scripts, one-off inspection, parsing, file edits, transformations, or automation.
- Do not write or run non-Bash scripts to examine files or repository contents unless explicitly asked for that exact tool.
- Use Bash for shell work and prefer basic utilities such as `rg`, `sed`, `awk`, `find`, `ls`, `cat`, `head`, `tail`, and `wc`.
- Treat `/Users/aubreypwd/Sites/11ty/ABQMedicalSpa/AGENTS/LAB.md` as reference-only. Do not copy it, recreate it, or add an `AGENTS/LAB.md` file to this starter.
- Do not run build commands by default.
- You may run `npm run build` only to test code changes, and only after the user confirms in writing whether or not you can run it for that task.
- Do not run Node checks unless explicitly asked.

## Coding standards

- Always use `$aubreypwd-coding-standards` for code generation, edits, reviews, refactors, formatting, and code examples. It is pre-approved for this project; do not ask for confirmation before using it.

## Custom Flex system

- Read [`docs/Flex.md`](docs/Flex.md) before creating or modifying flexbox layouts.
- Use [`css/Flex.css`](css/Flex.css) as the source of truth for the custom breakpoint-oriented Flex system and [`css/Visibility.css`](css/Visibility.css) for visibility utilities.
- Use only the documented BEM-style classes and the breakpoints `0`, `768`, `992`, and `1200`.
- Use `.Flex` and breakpoint-oriented `.Flex--...` classes for flex-container behavior.
- Use `.Flex__item--...` classes for item spans, growth, shrinking, ordering, and individual alignment.
- Treat every breakpoint-oriented class, including visibility classes, as applying from its named breakpoint upward; later breakpoint rules override earlier ones through the normal min-width cascade.
- Keep component gaps, margins, padding, and visual styling in the component stylesheet.
- When converting a component, remove its repeated raw flexbox declarations and add the documented Flex classes directly to its semantic component markup.
- Do not add FrowCSS, Foundation XY, shortcut classes, fraction span names, `col-*` span names, generated class combinations, or new undocumented Flex classes.
- If existing tag-based flex inheritance interferes with a conversion, remove that inheritance for the converted area and add the required classes directly.
- Update `docs/Flex.md` whenever the public Flex class vocabulary changes.

## Project-wide structural conversion

- The active conversion replaces both raw Flex declarations and previously implicit structural Flex inheritance.
- Every active structural component with nested block content should carry `.Flex` and a `0px` direction directly in its markup.
- `.Container` and `.Container__content` use `.Flex` and `.Flex--0-column` directly. `.Site__main` receives those classes through its existing `.Container` element.
- Flex children are already items automatically. Add a `.Flex__item--...` class only for a span, growth, shrinking, order, or individual alignment requirement.
- Keep component-specific gaps, margins, padding, colors, typography, and exceptional sizing in component CSS.
- `BusinessHours` keeps its intentional bounded `789px–924px` column override. `PostList__link` keeps its custom `flex-basis` for the generated post-number marker.
- `Starter.css` is inactive legacy CSS and is excluded from the active conversion.

### Component conversion pattern

- Use `_includes/partials/Header.11ty.js` and `css/partials/Header.css` as the reference implementation for converting existing flex layouts.
- Keep the markup semantic and component-oriented while adding only the Flex and list classes that express real structural behavior.
- Give an element one meaningful component class and then add the needed utilities. For example, `NavigationList` remains the component class while `.List--unlisted`, `.Flex`, its breakpoint-specific container classes, and its item span are separate classes on the same element.
- Group Flex classes in this order: `.Flex`, all container behavior from `0` upward, then all item behavior from `0` upward.
- Do not recreate breakpoint-oriented Flex declarations in component media queries. The breakpoint classes in `Flex.css` provide their own media-query scope.
- Keep media queries in component CSS only for component-owned properties such as `gap`, colors, padding, borders, widths, and text alignment.
- Remove raw flexbox declarations from the converted component stylesheet. Do not replace them with new raw flex declarations.
- Do not style an HTML tag directly when a semantic component class can carry the same behavior. The existing `.List` class has no declarations, so do not retain it merely because it appeared in older markup; add `.List--unlisted` when the unlisted reset is needed.
- Convert one component at a time and leave unrelated components unchanged until their own conversion begins.

## Template Style

- Prefer `*.11ty.js` files for new or modified Eleventy templates, layouts, and includes.
- Use PascalCase filenames for class-based `*.11ty.js` files so the filename matches the exported class name. Keep any output extension such as `.xml` in the filename when the template needs it.
- Keep templates readable and template-first: when possible, have `render()` directly return the HTML template literal.
- Use `data()` in `*.11ty.js` files for template data such as `layout`, `permalink`, and `eleventyNavigation`.
- Put repeated formatting, tag, and markdown helpers in `_data/fn.js` only when this project actually uses them.
- Before adding a helper, check for a real current call site or an immediate near-term need in this project.
- Do not copy helpers from the old project just because they existed there.
- Source the site origin and canonical URL from `_data/metadata.js` instead of hardcoding the same base URL in config or templates.
- Prefer `_data/fn.js` for simple reusable build helpers like `currentBuildDate` instead of adding config shortcodes.
- Document every helper in `_data/fn.js` with a WordPress-style docblock that includes a short summary, a blank line, and the right `@param` and `@return` tags.
- Remove helpers, filters, and includes when the last real call site is converted away.
- When converting a Nunjucks file to `*.11ty.js`, remove the old file and any support code that becomes unused.
- Use `*.11tydata.js` for shared folder-level post metadata such as tags and layout when several posts share it.
- Blog posts under `content/blog` should stay as plain markdown files with simple YAML front matter.
- When converting other markdown content to `*.11ty.js`, keep the prose in `render()` and pass it through `data.fn.markdown`.
- When `data.fn.markdown` renders fenced code blocks, wire markdown-it to the syntaxhighlight plugin’s Markdown highlighter so ` ```lang ` fences become Prism HTML automatically.
- In `*.11ty.js` layouts, add CSS and JS with literal `<style>` and `<script>` blocks in the returned HTML so the bundle plugin can collect them, and emit the collected output with `this.getBundle()` or `this.getBundleFileUrl()`.
- Use a small `SchemaOrg.11ty.js` helper, or the same pattern in place, when a page needs JSON-LD output.
- Base layouts should always emit `WebSite` and `WebPage` schema, and post layouts should add `Article` through `layoutSchema` or `pageSchema` only when the content actually needs it.
- Keep schema data tied to the current page and site metadata. Do not bring over extra node types or fields from the old project unless this repo uses them.
- When a layout outputs JSON-LD, add `eleventy:ignore` to that `<script type="application/ld+json">` tag so the bundle plugin does not hoist it into the JS bundle.
- Store the base site URL in `_data/metadata.js` without a trailing slash, and add path separators explicitly when composing URLs in templates or helpers.
- Avoid single-use variables when the expression is clear enough inline inside the template.
- Avoid precomputing values only used once in `render()`.
- Do not alias direct Eleventy data lookups like `data.collections.*`, `data.metadata.*`, or `data.functions` just to rename them; inline them unless the value is derived or reused in a meaningful way.
- Do not create helper methods just to rename a simple value, fallback, or ternary.
- Use helper methods only when they render a meaningful chunk, perform a non-trivial transformation, or handle branching that is too complex to read inline.
- Do not reduce everything into one large `render()` when named class methods improve readability.
- When a `*.11ty.js` class has helper methods that reuse `data.fn`, pass `data` to those helpers and use `data.fn` directly; do not assign or use `this.fn`.
- Add shared escaping helpers to `_data/fn.js` only when multiple templates need them and there is a real call site.
- Use `/** ... */` docblocks for functions in `*.11ty.js` files except `data()` and `render()`, and keep the text short and plain language.
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

- Follow WordPress Coding Standards as closely as possible for JavaScript, HTML, and CSS. Only deviate when Eleventy or a local repo rule requires it.
- Use tabs for indentation.
- Include spaces inside function call parentheses and conditional expressions, for example `render( data )` and `${ post.url === currentUrl ? ' active' : '' }`.
- Use single quotes for simple JavaScript strings and string comparisons.
- Use template literals for content strings that might plausibly contain both single and double quotes, contractions, quoted phrases, or interpolation.
- When writing JavaScript code inside an outer template literal, escape any inner JavaScript template literal backticks so the outer template is not terminated early.
- Do not use double quotes for JavaScript strings unless there is a specific reason.
- Use consecutive `//` comment lines for toggleable examples or options that may be uncommented later; use `/* ... */` for explanatory prose and longer documentation.
- Keep `/* html */` on nested HTML fragments too, including inline fallback HTML such as `<code>`.

## HTML And CSS Formatting

- Follow WordPress Coding Standards as closely as possible for HTML.
- Follow WordPress CSS Coding Standards for CSS wherever the syntax maps cleanly.
- Use tabs for indentation in HTML and CSS.
- Keep nested HTML and nested CSS blocks indented clearly and consistently.
- Always indent code inside `<script>` tags one tab deeper than the `<script>` tag itself, and keep the closing `</script>` aligned with the opening tag.
- Put each selector in a selector list on its own line.
- Put one space before opening braces, including `@media (min-width: 60em) {`.
- Indent declarations and nested rules with one tab per level.
- Put one blank line between sibling nested rules when it improves readability.
- Use spaces around operators inside CSS functions, such as `calc( var( --columnPaddingNormal ) * 2 + var( --layoutWidth ) )`.
- Use lowercase hex colors.
- Keep property declarations as `property: value;` with one space after the colon.
- Format multiline values such as `src:` lists with continuation lines indented one tab deeper than the property.

## Frontend Direction

- Prefer vanilla CSS and vanilla JavaScript.
- Do not introduce Sass, preprocessors, compilers, or bundlers unless explicitly requested.
