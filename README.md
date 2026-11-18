# 11tyStarterJS: Northline & Co.

An Eleventy 3 starter with a complete fictional local-business website. Northline & Co., owner Alex Morgan, the service categories, contact details, service areas, and testimonials are sample content. The starter deliberately excludes membership, Products navigation, client imagery, downloaded fonts, and client analytics configuration.

## Development

Use Node 24 or newer. `.nvmrc` selects Node 24, `package.json` requires Node 24+, and Netlify is configured for Node 24.

| Command | Purpose |
| --- | --- |
| `npm install` | Install the declared dependencies. |
| `npm run start` | Run the Eleventy development server with its default port. |
| `npm run serve` | Run Eleventy with the PORT supplied by Portless. |
| `npm run build` | Clear `_site` and generate the complete site. |

`portless.json` uses the name `11tyStarterJS` and the `serve` script. Eleventy runs directly; it is not wrapped in Node watch mode. Explicit watch targets cover `content/`, `css/`, `js/`, and `md/`, alongside Eleventy's normal watching for includes, data, configuration, dependencies, and passthrough assets.

The normal build runs output cleanup through npm's prebuild lifecycle. The alternate debug and path-prefix scripts remain in [package.json](package.json); they do not all run that cleanup step.

## Published pages

| Route | Source |
| --- | --- |
| `/` | [Index.11ty.js](content/Index.11ty.js) |
| `/primary-business-category/` | [PrimaryBusinessCategory.11ty.js](content/PrimaryBusinessCategory.11ty.js), four sample services |
| `/secondary-category-a/` | [SecondaryCategoryA.11ty.js](content/SecondaryCategoryA.11ty.js), five sample services |
| `/secondary-category-b/` | [SecondaryCategoryB.11ty.js](content/SecondaryCategoryB.11ty.js), five text-led sample services |
| `/thank-you-for-contacting-us/` | [ThankYouContact.11ty.js](content/ThankYouContact.11ty.js) |
| `/privacy-policy/` | [PrivacyPolicy.11ty.js](content/PrivacyPolicy.11ty.js) and [Markdown](md/PrivacyPolicy.md) |
| `/terms-of-service/` | [TermsOfService.11ty.js](content/TermsOfService.11ty.js) and [Markdown](md/TermsOfService.md) |
| `/404.html` | [NotFound.11ty.js](content/NotFound.11ty.js) |
| `/sitemap.xml` | [Sitemap.xml.11ty.js](content/Sitemap.xml.11ty.js) |

The homepage and category pages share `layouts/Category.11ty.js`: each renders Hero, a category content section with photo-and-text rows, About, Testimonials, Contact, and ServiceAreas, with shared Header and Footer. The homepage rows link to the three category pages; category-page rows show individual services. There is one contact form and one contact confirmation page. The confirmation and 404 pages retain robots directives; the sitemap includes pages with a permalink unless their robots metadata contains `noindex`.

The last clean build produced nine files through Eleventy, plus the JavaScript bundle and passthrough manifest. Build and local serving checks have passed. Rendered browser appearance and live reload across every watch target have not been exhaustively checked.

## Source organization

| Location | Responsibility |
| --- | --- |
| `content/` | Page templates, sitemap, and retained sample posts. |
| `_includes/layouts/` | Base document, Category composition, Page content, Post layout, and a scaffold. |
| `_includes/partials/sections/` | Header, Footer, Hero, About, Testimonials, Contact, and ServiceAreas. |
| `_includes/partials/components/` | Section wrappers, content rendering, links, buttons, branding placeholders, navigation, address, hours, schema, and Toast. |
| `_includes/utils/UnheadSchema.11ty.js` | JSON-LD graph rendering. |
| `_data/` | Business data, metadata, settings, testimonials, events, helpers, and the partial registry. |
| `css/layouts/` | Layout styles; Base's supporting styles are grouped under `css/layouts/Base/`. |
| `css/partials/` and `js/partials/` | Assets grouped by the section or component that owns them. |
| `md/` | Markdown read by its owning page template. |
| `content/img/` | All image source files. HTML images are optimized; CSS images in `content/img/css/` pass through to `/img/css/`, the social image passes through to `/img/social.webp`, and favicon files from `content/img/favicons/` pass through to the site root. |
| `public/` | Files copied to the output root; currently the web manifest. |
| `_site/` | Generated output, recreated by the normal full build. |

The partial registry discovers nested class templates and exposes unique filename-based keys through `data.partials`. Partial render calls use data, context, and an options object. Section receives its rendered HTML slot as a fourth argument. Content receives child content as its fourth argument, renders Markdown by default, and supports HTML passthrough through `markdownIfy: false`. Its optional fifth argument supplies aside HTML.

Layouts receive child output through `data.content`. Shared file, Markdown, escaping, date, element, asset-registry, and title helpers live in [_data/fn.js](_data/fn.js). The title separator lives in [_data/settings.js](_data/settings.js).

## Current visual direction

- All typography uses the single `--font-SansSerif` system stack. Retained Serif and Fancy helper classes use that same font.
- The palette is blue and orange, defined in [Colors.css](css/layouts/Base/Colors.css).
- The Hero card spans the available Hero content width over an [Unsplash office image](https://images.unsplash.com/photo-1497366811353-6870744d04b2).
- Portrait, category images, and header/footer logos use remote placehold.co images. They bypass build-time image processing through `eleventy:ignore`.
- Everything is square and has no drop shadow. Filled buttons are borderless; transparent buttons retain borders.
- About has a square portrait and no signature. Sample testimonials have a centered fictional-review notice and no quote decoration.
- Contact is titled “Contact Us,” uses a generic Message textarea without placeholder text, and puts Address and Hours in separate responsive columns. It has no building-directions section or phone icons.
- The borderless Google Maps embed shows Central Park, New York, explicitly as a sample location rather than the fictional business address.

Components own their layout in plain CSS. The named media queries are exclusive ranges: mobile below 768px, tablet from 768px to below 992px, lowres from 992px to below 1200px, and highres from 1200px upward. `--below-highres` combines the first three. Definitions live in [breakpoints.css](css/layouts/Base/breakpoints.css); intentional component-specific and preference queries remain literal.

## Bundles, metadata, and forms

Both serve and build collect styles and scripts through Eleventy's bundle support. JavaScript is minified as ESM. The completed CSS bundle goes through PostCSS custom-media expansion, PurgeCSS, and CSS minification. HTML is minified last. The pipeline preserves CSS custom properties, its runtime-selector safelist, preformatted whitespace, and JSON-LD. Ordinary HTML comments are removed from generated pages.

Base emits canonical URLs, robots directives when present, body classes based on file slugs, and the shared business/WebSite/WebPage schema graph. Post retains Article schema support. A populated page FAQ array generates FAQ schema; there is currently no published FAQ example after the membership removal.

Open Graph and Twitter text metadata are active. Image metadata is retained as commented code in [Base.11ty.js](_includes/layouts/Base.11ty.js), ready for `/img/social.webp`. Its 1200×630 dimensions and descriptions are placeholders to update with the actual image.

Favicon and manifest icon references are active, but the icon files are intentionally absent. Their expected filenames are listed in [TODO.md](TODO.md). The fictional business schema uses the same placeholder logo and portrait URLs as the site; geographic coordinates and a business-map URL remain commented until a real location is supplied.

Keep every image source under `content/img/`. Local images used in HTML are processed by Eleventy's image transform. Put CSS background images under `content/img/css/`; that folder passes through to `/img/css/` without copying the images used by the optimizer. The social image passes through from `content/img/social.webp` to `/img/social.webp`. Put favicon and manifest icon files under `content/img/favicons/`; they pass through to the site root. The non-image web manifest remains in `public/`.

The contact form retains Netlify-compatible markup and its local thank-you action. Call, text, and email links use the fictional telephone and email values in the business schema. Testimonial destinations without official URLs use `#`. Facebook and Instagram use invented `northlineandco.demo` profile URLs. Working internal routes and section anchors remain intact.

No analytics script or client identifier is included. Paste your Umami script into the HTML comment placeholder in Base and add `eleventy:ignore` to its script tag. Optional event attributes remain supported by shared Link and Button rendering.

## Retained, disabled features

Sample blog posts remain under `content/blog/`, with output disabled by folder data. Tags, the partial showcase, and the page scaffold are not published. The Post layout, tag-page template, feed configuration, XSL stylesheet, Toast assets, and class-based partial/layout scaffolds remain available. The feed configuration and some example asset registrations are commented out.

These are retained starting points, not active site features. Re-enable their routes, collections, and asset registrations together when a project needs them. `css/Starter.css` remains inactive legacy CSS.

## Adapting the starter

Replace the fictional identity in [_data/schema.js](_data/schema.js) and [_data/metadata.js](_data/metadata.js), then update page and section copy, testimonials, sample legal pages, images, social links, and contact destinations. The `.example` origin, 202-555-0148 phone number, and Example City address are deliberate placeholders.

Keep useful configuration and implementation scaffolding when an asset is not ready. Leave the relevant markup commented rather than deleting it. [TODO.md](TODO.md) distinguishes deferred assets from project-specific setup, and [AGENTS.md](AGENTS.md) records the development rules and accepted design decisions.
