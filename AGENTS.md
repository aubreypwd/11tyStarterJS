# AGENTS.md instructions for /Users/aubreypwd/Sites/11ty/11tyStarterJS

## Current project

- This is the fictional Northline & Co. local-business starter, built with Eleventy 3.1.5 and ESM JavaScript. Node 24 is selected by `.nvmrc`; `package.json` supports Node 24 or newer.
- Treat this starter's current source, README, TODO, and user-approved decisions as authoritative. Keep its fictional content and assets free of outside business-specific material.
- Preserve generic implementation and configuration scaffolding even when an asset is absent. Comment out asset-dependent markup when appropriate; do not remove code merely because its image, icon, or optional service has not been supplied.
- Keep work scoped to the requested change. Do not perform unrelated cleanup, audits, speculative helper additions, or source-parity refactors.
- Use README.md for the current structure and enabled features. Use TODO.md for deferred assets and real-business setup. Disabled examples and deliberately removed features are not unfinished work.

## Commands

- Never use git for any reason.
- Do not use Python for commands, scripts, one-off inspection, parsing, file edits, transformations, or automation.
- Do not write or run non-Bash scripts to examine files or repository contents unless explicitly asked for that exact tool.
- Use Bash for shell work and prefer basic utilities such as `rg`, `sed`, `awk`, `find`, `ls`, `cat`, `head`, `tail`, and `wc`.
- Treat `/Users/aubreypwd/Sites/11ty/ABQMedicalSpa/AGENTS/LAB.md` as reference-only. Do not copy it, recreate it, or add an `AGENTS/LAB.md` file to this starter.
- Do not run build commands by default.
- You may run `npm run build` only to test code changes, and only after the user confirms in writing whether or not you can run it for that task.
- Honor build permission already given for the active task; do not ask again within that authorized scope. Documentation-only edits do not need a build.
- Do not run Node checks unless explicitly asked.
- Do not install software or npm packages without explicit authorization; honor authorization already supplied for the active task.
- Prefer source, generated HTML, CLI checks, and purpose-built connectors. Computer or browser automation requires explicit approval for a stated purpose before its first action, including app/tab discovery. General permission to build or test does not authorize browser use.

## Coding standards

- Always use `$aubreypwd-coding-standards` for code generation, edits, reviews, refactors, formatting, and code examples. It is pre-approved for this project; do not ask for confirmation before using it.

## Plain CSS layout

- Write layout behavior in the stylesheet that owns the component. Keep semantic BEM component classes in markup and do not add Flex, Visibility, grid, spacing, or other layout helper classes.
- Keep the Font helper classes and `css/layouts/Base/fonts.css`. Typography helpers are intentional and are not part of the layout-helper removal.
- Use ordinary CSS properties for display, direction, alignment, wrapping, sizing, ordering, visibility, gaps, and responsive changes.
- Use the exclusive viewport ranges documented in `css/layouts/Base/breakpoints.css`: `--mobile` (below `768px`), `--tablet` (`768px` to below `992px`), `--lowres` (`992px` to below `1200px`), and `--highres` (`1200px` and wider). Desktop means the lowres and highres ranges together.
- Unqueried base declarations apply at all viewport widths. Keep them for values shared across every range; do not treat base styles as desktop styles. Put range-specific values inside the relevant media query.
- For values shared by only some ranges, use a comma-separated list of the exact ranges that should match. Commas mean OR. Use `--below-highres` for styles shared by mobile, tablet, and lowres; add another composite custom-media alias when a different range combination is reused. Do not add an `--all` alias because base styles already apply to all ranges.
- Desktop-first authoring is supported: work from highres to lowres, tablet, then mobile when that order fits the design process. Keep each responsive override with the selector it changes; exclusive ranges do not require later ranges to undo earlier range styles.
- Keep custom component breakpoints when the design requires a bounded or one-off range. `BusinessHours` retains its intentional `789px–924px` bounded column range.
- `css/layouts/Base.css` intentionally gives the listed block and container elements a shared column flex default after resetting their margin and padding. Keep those defaults; components may override them in their owning stylesheets. `.Site` and `.Site__main` define the document-level layout.
- Keep `PostList__link`'s custom `flex-basis` for the generated post-number marker.
- `Starter.css` is inactive legacy CSS and is excluded from active layout work.

## Partials and assets

- Group page compositions under `_includes/partials/sections/` and reusable or technical pieces under `_includes/partials/components/`. Header and Footer are sections; Schema is a component.
- Mirror partial ownership under `css/partials/` and `js/partials/`. Group layout-loaded styles under `css/layouts/` and layout-loaded scripts under `js/layouts/`; keep package assets in `node_modules`.
- Keep the partial registry recursive with keys derived from unique class filenames.
- Render partials with data, context, and an options object. Prefer explicit caller settings for new work; preserve existing cascade behavior unless the requested task changes it.
- Preserve context fallbacks and existing defaults followed by caller options. Header and Footer default to rendering; Base passes their page-level options.
- Section receives rendered HTML as its fourth argument. Content receives child content as its fourth argument and renders Markdown unless `markdownIfy` is false.
- Section requires a non-empty name. Supply meaningful names/content when calling SectionHeader, while preserving its current reference-derived defaults and validation. Use descriptive variation names with `default`, never numbered variations.
- Use the Section wrapper for shared Container shells. Keep its section, container, and content variations independent.
- Put template-owned Markdown under root `md/`, read it in the owning page through `data.fn.printFile()`, and pass layout children through `data.content`. Blog posts remain Markdown in `content/blog/`.
- Keep FAQ arrays shared between visible questions/answers and Base's computed FAQ schema.
- Store every image source under `content/img/`. Images used in HTML are transformed by Eleventy's image plugin. Put CSS background images under `content/img/css/` and pass that subtree through to `/img/css/`; do not passthrough-copy HTML image sources. Pass the social image from `content/img/social.webp` through to `/img/social.webp`. Put favicon and manifest icon files under `content/img/favicons/` and copy them to the site root.
- Keep generic scaffold templates free of site-specific assets and content.

## Template Style

- Prefer `*.11ty.js` files for new or modified Eleventy templates, layouts, and includes.
- Use PascalCase filenames for class-based `*.11ty.js` files so the filename matches the exported class name. Keep any output extension such as `.xml` in the filename when the template needs it.
- Keep templates readable and template-first: when possible, have `render()` directly return the HTML template literal.
- Use `data()` in `*.11ty.js` files for template data such as `layout`, `permalink`, and `eleventyNavigation`.
- Put repeated formatting, tag, and markdown helpers in `_data/fn.js` only when this project actually uses them.
- Before adding a helper, check for a real current call site or an immediate near-term need in this project.
- Do not add more helpers from other projects without a current need. Preserve the helpers already ported with the reference implementation unless their removal is part of the requested work.
- Source the site origin and canonical URL from `_data/metadata.js` instead of hardcoding the same base URL in config or templates.
- Prefer `_data/fn.js` for simple reusable build helpers like `currentBuildDate` instead of adding config shortcodes.
- When a requested conversion makes support code obsolete, remove that support code within the conversion's scope. Do not prune intentionally retained examples, helpers, or asset-dependent scaffolding merely because they are currently disabled.
- When converting a Nunjucks file to `*.11ty.js`, remove the old file and any support code that becomes unused.
- Use `*.11tydata.js` for shared folder-level post metadata such as tags and layout when several posts share it.
- Blog posts under `content/blog` should stay as plain markdown files with simple YAML front matter.
- When converting other markdown content to `*.11ty.js`, keep the prose in `render()` and pass it through `data.fn.markdown`.
- When `data.fn.markdown` renders fenced code blocks, wire markdown-it to the syntaxhighlight plugin’s Markdown highlighter so ` ```lang ` fences become Prism HTML automatically.
- In `*.11ty.js` layouts, add CSS and JS with literal `<style>` and `<script>` blocks in the returned HTML so the bundle plugin can collect them, and emit the collected output with `this.getBundle()` or `this.getBundleFileUrl()`.
- Use the existing `Schema.11ty.js` component and `UnheadSchema.11ty.js` utility for JSON-LD output.
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
- Do not add declaration docblocks or JSDoc to project source. Keep ordinary comments concise and limited to useful, non-obvious behavior.
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
- Put one space before opening braces, including `@media(--lowres) {`.
- Indent declarations and nested rules with one tab per level.
- Put one blank line between sibling nested rules when it improves readability.
- Use spaces around operators inside CSS functions, such as `calc(var(--columnPaddingNormal) * 2 + var(--layoutWidth))`.
- Use lowercase hex colors.
- Keep property declarations as `property: value;` with one space after the colon.
- Format multiline values such as `src:` lists with continuation lines indented one tab deeper than the property.

## Frontend Direction

- Prefer vanilla CSS and vanilla JavaScript.
- Do not introduce Sass or additional preprocessing/bundling workflows unless explicitly requested. Keep the existing Eleventy bundle, PostCSS, PurgeCSS, and esbuild pipeline.

## Build pipeline

- Run Eleventy directly in serve mode and preserve Portless's assigned PORT. Do not wrap Eleventy in Node watch mode.
- Watch content, css, js, and md explicitly; retain normal passthrough watching and Eleventy's built-in dependency watching.
- Transform bundled JavaScript with esbuild; process completed CSS through PostCSS, PurgeCSS, and esbuild; minify HTML last. Apply in build and serve modes.
- Preserve preformatted whitespace, CSS variables, runtime selectors, and JSON-LD. Keep `eleventy:ignore` on schema scripts.
- The normal full build cleans the configured `_site` output first.
- Keep social-image metadata synchronized with the starter-owned image, and derive absolute URLs from metadata.url.

## Fictional business and links

- Northline & Co. and Alex Morgan are invented. Keep Primary Business Category, Secondary Category A, and Secondary Category B as literal placeholder category names until deliberately replacing them.
- Do not add real client copy, medical qualifications or claims, client branding assets, contact details, product destinations, or analytics identifiers.
- The `.example` origin, phone number, address, and service areas are placeholders. Keep sample testimonials clearly identified as fictional, with the explanatory note centered.
- Keep exactly one contact form and its `/thank-you-for-contacting-us/` confirmation route. Membership, a second form variation, its thank-you page, and Products navigation were intentionally removed.
- Use schema telephone/email values for Call, Text, and Email links. Use `#` when a review or testimonial destination has no official URL. Keep the invented `northlineandco.demo` Facebook and Instagram profiles until official accounts are supplied.
- Preserve working internal page links and section anchors. The Google Maps embed shows Central Park, New York, as a labeled sample, not the fictional business address.

## Current presentation

- Use only the `--font-SansSerif` custom property for font families. Retained Serif and Fancy helper classes use that same system sans-serif stack; do not add font-family aliases.
- Keep the blue-and-orange palette in `css/layouts/Base/Colors.css`.
- Keep the Hero card full width within its content shell, with the selected remote Unsplash office background.
- Use remote placehold.co images for other photo areas and both shared LogoMark variants. Retain `eleventy:ignore`, intrinsic dimensions, and appropriate alternative text on these placeholders.
- Keep the About portrait square. Do not add a signature or testimonial quote decoration.
- Keep all elements square and free of drop shadows. Filled buttons have no border; transparent buttons retain a border. Do not round social icons or add a border around the map.
- Keep the contact form heading “Contact Us” and the sidebar heading “Contact Details.” Address and Hours occupy separate responsive columns. Do not restore building directions or phone icons.
- Keep the textarea label/name “Message,” with no placeholder text.

## Deferred configuration and retained examples

- Retain the favicon links and manifest icon entries using their current filenames. Aubrey will supply the files under `content/img/favicons/`.
- Keep the complete Open Graph and Twitter image tags commented in Base until `content/img/social.webp` exists. Update the dimensions, type, and alternatives for the actual image before enabling them. Do not delete this metadata scaffolding.
- Business schema retains logo/portrait placeholders and owner/founder relationships. Keep optional geographic configuration available for a real business location rather than copying the reference client's coordinates.
- Keep the HTML comment in Base for pasting an Umami script. There is no separate analytics loader or website-ID setting. Retain optional event attributes on shared links/buttons, and use `eleventy:ignore` on a future external analytics script.
- Keep the sample blog posts, Tags, partial showcase, PageTemplate, Post layout, feed configuration/XSL, Toast assets, and generic scaffolds available without publishing them by default. Check their routes, collections, and asset registrations together if explicitly re-enabling them.
- `public/` currently contains the manifest; generated output belongs in `_site/`. Do not edit `_site/` as a substitute for changing source.
