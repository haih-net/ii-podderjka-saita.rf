# Site customization

This directory owns the Russian content for `ии-поддержка-сайта.рф`, as agreed with the owner for the Russian market.

- `pages/HomePage/`: the offer, experience, price guidance and entry points.
- `pages/ServicesPage/`: six support areas with section links.
- `pages/HowItWorksPage/`: onboarding and FAQ.
- `pages/ServiceDetails/`: six separate support topics.
- `pages/ContactPage/`: direct contact.
- `components/SiteLayout/`: shared navigation, focus handling, footer and minimal Linaria typography.

Route adapters remain in `app/routes/`. `app/routes.ts` enables `/`, `/services`, `/how-it-works`, `/contact`, six `/services/*` detail pages and a 404 route. Inherited HAIH page source is retained but is not registered or included in the sitemap. Page components use named exports; the existing React Router integration requires default exports at framework entry points.

Content is kept in TSX files, without a content API or database. AI-agent integration, additional pages, generated images and visual design are deferred. Contact links currently lead to the contact page and the author's public Telegram profile; no message is sent automatically.

## Development

From the site root, use `npm ci` once and `npm run dev`. Only `app` is needed for Docker development:

```bash
docker compose -f docker/compose.yaml -f docker/compose.dev.yaml up -d app
```

For simultaneous local sites, use free ports, for example `PORT=3101 HMR_PORT=24679 npm run dev`. `HMR_PORT` is optional and preserves Vite's default when omitted. Do not start the whole infrastructure just to edit pages.

## Verification — 2026-10-05

Passed `npm run types`, `npm run build`, `npm run test:seo`, focused ESLint and `git diff --check`. Generated HTML includes Russian content, unique metadata, correct canonical URLs and extracted CSS. The tests also check internal links/fragments and 404 responses for unknown URLs and retired template routes.

A local Chromium check covered direct navigation to all pages, SPA transitions without document reload, heading focus, metadata changes, page links, back/forward, 404, and absence of horizontal overflow at 360px and 1280px. Mobile screenshots were inspected. No page errors were observed. React hot updates were separately checked against the direct local development server.

Production proxy/cache checks were not run. The inherited `npm test` suite targets the production Traefik/Varnish path and still requires that environment. Existing server/infrastructure behavior is outside this content change; no deployment was performed.


## Search-space rules — 2026-10-05

Public navigation must not use URL fragments. Topics referenced independently have separate pages. A keyboard skip button focuses the main region without changing the URL. Across the site, link to at most three other sites; each page may link to at most one, including header and footer links. The current external destinations are fi1osof.ru, modx.ru and t.me on different pages. `npm run test:seo` checks these rules, all ten prerendered pages and the sitemap.

Positioning includes practical AI expertise, integration of existing solutions and custom tools, alongside 19+ years of web and business-process experience. Search demand is recorded in the parent marketing search-space registry; no query frequencies were measured in this change.
