# Project status and remaining setup

The fictional Northline & Co. starter is implemented. The tasks below distinguish deferred files from changes needed only when adapting it for a real business.

## Deferred assets

Aubrey will provide these files. References are intentionally retained; do not copy TheGlowStandard's assets.

- [ ] Add the favicon files to `public/`: `favicon-96x96.png`, `favicon.svg`, `favicon.ico`, and `apple-touch-icon.png`.
- [ ] Add `web-app-manifest-192x192.png` and `web-app-manifest-512x512.png` to `public/`, matching the manifest's maskable icon entries.
- [ ] Add `public/img/social.webp`; update its width, height, MIME type, and descriptive alternatives, then uncomment the Open Graph and Twitter image tags in Base. The current 1200×630 values are placeholders.

## When adapting for a real business

- [ ] Replace Northline & Co., Alex Morgan, the literal category names, fictional services, contact details, hours, and service areas.
- [ ] Set the actual origin and author metadata, business schema, logo/portrait references, coordinates, and business-map URL.
- [ ] Replace the placehold.co photos and logos, and choose whether to retain or replace the Unsplash Hero image.
- [ ] Replace the sample Google Maps location with the business location.
- [ ] Replace `#` contact/review destinations and the invented Facebook/Instagram profiles with official links.
- [ ] Replace invented testimonial content with authorized real material, and update the fictional-review notice accordingly.
- [ ] Replace the demonstration privacy and terms pages with the actual operator's policies.
- [ ] Configure and check the contact form on the chosen host, retaining its single thank-you flow and robots directives.
- [ ] If analytics is wanted, paste the site's own Umami script into Base's placeholder and add `eleventy:ignore` to the script tag.

## Verification still available

Clean builds and a local serving check have passed. These broader checks have not been completed:

- [ ] Check rendered responsive layouts and interactions, including navigation, in a browser after explicit approval for that use.
- [ ] Exercise rebuild/reload behavior through Portless for each watched source folder.
- [ ] Check the favicon, sharing-image, and real form behavior after supplying the deferred assets and deployment settings.

## Optional retained features

Blog posts, Tags, the partial showcase, the page scaffold, and the feed are intentionally disabled or not published. Re-enable them only when needed, including their collection, route, stylesheet, and script registrations. Their retained source is not unfinished work.

Membership, its second form/thank-you flow, Products navigation, the About signature, building directions, quote decorations, custom fonts, rounded styling, and shadows were deliberately removed. Do not restore them as pending tasks.
