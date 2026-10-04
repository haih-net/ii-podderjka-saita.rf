# ии-поддержка-сайта.рф

Russian content is implemented in `app/Custom`: home, services, how it works, contact and six service detail pages. See [site-specific development and verification notes](app/Custom/README.md). The content is static; AI-agent integration and visual design are deferred.

For page development run only `app`, or use `npm run dev` locally. Hot reload is configured. The original template documentation below is retained as background and includes capabilities and routes that are not active on this site.

---

# HAIH Site

**Build better software with AI — by starting from requirements, not frameworks.**

HAIH Site is a public demonstration of requirement-driven development. Instead of adopting tools first and fitting problems to them, we begin with real needs and choose solutions that earn their place.

## Why This Matters

Most AI-assisted development starts with a technology stack and hopes for the best. HAIH flips this: every solution must justify itself through **purpose**, **capabilities**, **requirements**, and **evidence**.

The website you see is its own proof. Every architectural decision, every dependency, every line of code exists because a real need demanded it — and that need is documented.

## What You Get

- **Transparent decision-making** — See exactly why each technology was chosen
- **Working demonstrations** — Not slides, not promises — running code you can verify
- **Production-ready architecture** — React 19, TypeScript, Vite 8, Docker, Traefik, Varnish
- **Modern delivery** — SPA navigation, build-time rendering, code splitting, HTTP caching

## Tech Stack

| Layer         | Technology            | Purpose                                   |
| ------------- | --------------------- | ----------------------------------------- |
| **UI**        | React 19 + TypeScript | Type-safe components with modern hooks    |
| **Routing**   | React Router 7        | SPA navigation, code splitting, SSR-ready |
| **Build**     | Vite 8                | Fast HMR, optimized production bundles    |
| **Server**    | Node.js 22 + sirv     | Minimal static file serving               |
| **Cache**     | Varnish 7             | Edge caching with explicit policies       |
| **Proxy**     | Traefik 3             | TLS termination, routing, load balancing  |
| **Container** | Docker Compose        | Reproducible environments                 |

## Quick Start

```bash
# Development (with hot reload)
npm install
npm run dev
# → http://127.0.0.1:3000

# Production build
npm run build
npm start
# → http://127.0.0.1:3000
```

## Docker

```bash
cd docker

# Development
docker compose -f compose.yaml -f compose.dev.yaml up -d
# → http://127.0.0.1:8080 (Traefik HTTP)
# → http://127.0.0.1:8443 (Traefik HTTPS)
# → http://127.0.0.1:8088 (Traefik Dashboard)
# → http://127.0.0.1:3001 (App direct)

# Production
docker compose -f compose.yaml -f compose.prod.yaml up -d
# → http://127.0.0.1:80 (Traefik → Varnish → Node.js)
# → https://127.0.0.1:443
```

### Ports

| Mode        | Service           | Default Port | Variable                 |
| ----------- | ----------------- | ------------ | ------------------------ |
| Local       | Vite/Node.js      | 3000         | `PORT`                   |
| Docker dev  | Traefik HTTP      | 8080         | `SITE_PORT`              |
| Docker dev  | Traefik HTTPS     | 8443         | `SITE_PORT_HTTPS`        |
| Docker dev  | Traefik Dashboard | 8088         | `TRAEFIK_DASHBOARD_PORT` |
| Docker dev  | App direct        | 3001         | `APP_PORT`               |
| Docker prod | Traefik HTTP      | 80           | `SITE_PORT`              |
| Docker prod | Traefik HTTPS     | 443          | `SITE_PORT_HTTPS`        |

External network: `NETWORK_NAME` (required for Docker)

## Architecture Highlights

**Request Flow (Production):**

```
Browser → Traefik → Varnish → Node.js → Static Assets
```

**Request Flow (Development):**

```
Browser → Traefik → Vite Dev Server → Source Files
```

- **Immutable assets** get year-long cache headers
- **HTML pages** respect s-maxage for CDN freshness
- **404s are real 404s** — no catch-all SPA fallback hiding broken links

## Project Structure

```
app/
  routes/            # Page components with meta exports
  components/Layout/ # Shared Header, main content, Footer and basic responsive CSS
  root.tsx           # HTML document, shared layout integration, error boundary
server/
  index.ts           # Production static server (compiled to build/node/)
docker/
  compose.yaml       # Base Docker Compose configuration
  compose.dev.yaml   # Development overrides
  compose.prod.yaml  # Production overrides
  traefik/           # Traefik configuration, certs, logs
    traefik.yml      # Static config (entrypoints, providers)
    dynamic/local/   # Dynamic routing rules
  varnish/
    default.vcl      # Varnish cache configuration
```

## Development

```bash
npm run dev        # Start Vite dev server
npm run types      # TypeScript validation
npm run build      # Production build
npm run test       # HTTP behavior tests
```

## The HAIH Approach

Every solution in this project follows a consistent evaluation model:

1. **Purpose** — What need does it satisfy?
2. **Capabilities** — What does it provide?
3. **Requirements** — What does it demand?
4. **Trade-offs** — Where is the cost justified?
5. **Evidence** — What has been verified?

This isn't methodology theater. It's how we actually build — and how AI assistants can make better recommendations when they understand _why_, not just _what_.

## Status

This is the architectural foundation phase. The website demonstrates:

- ✅ Reproducible development and production builds
- ✅ React HMR through Traefik proxy
- ✅ SPA navigation with browser history
- ✅ Build-time HTML generation
- ✅ Route-level code splitting
- ✅ Proper error boundaries
- ✅ Production caching with Varnish

Visual design and expanded content come next — after the foundation is proven.

## License

See repository for license details.

---

**haih.site** — Requirement-driven development, demonstrated.

## Shared page layout

`app/components/Layout` provides the common Header, main landmark and Footer. The root document wraps route content and error fallbacks with this shell, so navigation stays available on 404 and route-error pages. Internal links use React Router, with active navigation and heading focus after forward navigation. A keyboard skip link targets the main content. The footer follows long content and sits at the bottom of short pages.

The shell uses small mobile-first plain CSS rules without adding a styling dependency; this does not resolve the separate styled-component investigation. Verified with `npm run types`, `npm run build`, focused ESLint, generated HTML inspection, and browser checks through the development proxy at desktop and 360px widths, including navigation, a route rendering error and a missing page.

## Server monitoring

The [monitoring runbook](docker/monitoring/README.md) describes the production-artifact preview, Grafana dashboard, internal per-site probes, request/application logs and optional email/Telegram alerts. The installation is shared by sites behind one Traefik and uses an explicit site registry. [Verification results](docker/monitoring/verification.md) distinguish the local checks from unverified production behavior. Request filtering is deferred.
