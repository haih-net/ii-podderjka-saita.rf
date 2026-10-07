export type Solution = {
  id: string
  name: string
  status: string
  provides: string
  dependsOn: string
  evidence?: { label: string; path: string }
  children?: Solution[]
}

export type SolutionLayer = {
  id: string
  name: string
  summary: string
  solutions: Solution[]
}

export const layers: SolutionLayer[] = [
  {
    id: 'application',
    name: 'Application — components, navigation and rendering',
    summary:
      'React components form the pages. React Router connects browser navigation with prerendering and the application server.',
    solutions: [
      {
        id: 'react',
        name: 'React',
        status: 'In use',
        provides:
          'Reusable components, UI state and hydration of generated HTML.',
        dependsOn:
          'React DOM and a browser for client execution; the build also renders public pages in Node.js.',
        children: [
          {
            id: 'react-router',
            name: 'React Router',
            status: 'In use; also integrates with the build',
            provides:
              'Routes, SPA navigation, metadata integration, lazy route modules, error boundaries and build-time page rendering. Vite alone does not provide this complete integration.',
            dependsOn:
              'React, its Vite integration and Node.js. The current configuration enables request-time SSR alongside prerendering; Express connects the production server build. Components are not automatically excluded from client JavaScript because they were prerendered.',
          },
        ],
      },
    ],
  },
  {
    id: 'tooling',
    name: 'Development and build — Node.js runs the tools',
    summary:
      'npm run dev starts development directly. npm run build produces HTML, JavaScript, CSS and the Node.js server. Docker, Traefik and Varnish are not prerequisites.',
    solutions: [
      {
        id: 'node-tooling',
        name: 'Node.js + npm',
        status: 'Required by the current toolchain',
        provides:
          'The runtime and package workflow used to install dependencies, run development tools and build the application.',
        dependsOn:
          'The supported Node.js version, package.json and the lockfile. Our Vite toolchain runs on Node.js, not inside the browser or Docker itself.',
        children: [
          {
            id: 'vite',
            name: 'Vite',
            status: 'In use as Express middleware with React Router',
            provides:
              'A development server with HMR, module and asset processing, production bundles and code splitting. It covers these needs without a custom build pipeline; it is not the production HTTP server.',
            dependsOn:
              'Node.js, source modules and configuration. Vite shares the application HTTP listener for HMR at /__vite_hmr; the browser uses its page host, port and WS/WSS protocol. React Router supplies routing and prerendering. A React edit was checked over simultaneous local HTTP and HTTPS connections; this does not establish every style or state-preservation case.',
            children: [
              {
                id: 'linaria',
                name: 'Linaria + WyW Vite plugin',
                status: 'In use; focused verification continues',
                provides:
                  'Styled-component references inside selectors while extracting CSS during the build. This styling requirement exists now, which is why Linaria was introduced now.',
                dependsOn:
                  'The Vite transform and statically extractable styles. Page and layout wrappers use Linaria styled components with CSS extracted during the build. Color and new-rule edits were checked both directly and through the HTTPS proxy. Cross-file selectors, dynamic values, hydration and lazy CSS delivery still need focused verification; fewer dependencies alone would not make CSS Modules an equivalent substitute.',
              },
            ],
          },
          {
            id: 'development-http-https',
            name: 'HTTP and HTTPS development with shared HMR',
            status: 'Implemented; checked in local Chromium',
            provides:
              'Open the same running app over HTTP and HTTPS at once. One React source edit updates both views without switching modes or publishing a separate HMR port. Traefik routes the update connection directly to the app; ordinary requests pass through Varnish without caching.',
            dependsOn:
              'For the proxy path: Docker Compose, the configured external network, available ports and a local TLS certificate. Defaults are HTTP 8080, HTTPS 8443 and direct app HTTP 3001. Browser trust is a separate setup step; published ports bind to loopback. The check covered two tabs and a React component edit, not every browser, Linaria update, authentication flow or remote device. Direct npm run dev remains available without this infrastructure.',
            evidence: {
              label: 'Two protocols. One development loop.',
              path: '/blog/two-protocols-one-development-loop',
            },
          },
          {
            id: 'typescript',
            name: 'TypeScript',
            status: 'In use',
            provides:
              'Checks component props and integration contracts with npm run types. esbuild bundles the production server separately; a successful bundle does not imply a successful type check.',
            dependsOn:
              'Node.js, type definitions and TypeScript configuration. It does not replace runtime validation.',
          },
          {
            id: 'storybook',
            name: 'Storybook',
            status: 'Optional; configured',
            provides:
              'An isolated environment for inspecting component states without navigating full pages.',
            dependsOn:
              'React/Vite integration and component stories. Scripts and configuration exist; the story catalog remains to be populated.',
          },
          {
            id: 'checks',
            name: 'ESLint and Prettier',
            status: 'In use',
            provides:
              'Code checks and consistent formatting alongside type checking. Behavioral verification is described in the testing layer below.',
            dependsOn:
              'Project rules and configuration. Static checks do not establish browser behavior, API correctness or cache policy.',
          },
        ],
      },
    ],
  },
  {
    id: 'verification',
    name: 'Verification — checks with explicit environments',
    summary:
      'Fast unit feedback, local integration checks, browser scenarios and deployed-stack checks have separate commands. A result applies to the behavior and environment it actually exercised.',
    solutions: [
      {
        id: 'vitest',
        name: 'Vitest',
        status: 'In use; unit and integration suites',
        provides:
          'npm test discovers unit tests without a running application. npm run test:integration builds first, then checks generated SEO/HTML, monitoring configuration and a GraphQL error fixture. Watch commands and unit coverage reports are available.',
        dependsOn:
          'Node.js and the test configuration. Integration fixtures use temporary files and local listeners; the integration watcher does not rebuild changed artifacts. Coverage is scoped to configured SEO/server source, not the whole system.',
        evidence: {
          label: 'The tests passed. Which tests?',
          path: '/blog/the-tests-passed-which-tests',
        },
      },
      {
        id: 'playwright',
        name: 'Playwright',
        status: 'In use; focused browser checks',
        provides:
          'Tests SPA navigation, history, metadata, heading focus, deep-link refresh and 404 behavior in desktop Chromium, desktop WebKit and mobile Chromium. Failures retain traces and screenshots.',
        dependsOn:
          'Browser binaries and system libraries. npm run e2e normally builds and starts the production Node.js server; PLAYWRIGHT_BASE_URL instead uses a prepared environment. These scenarios do not establish every hydration, accessibility or chunk-recovery behavior.',
      },
      {
        id: 'stack-tests',
        name: 'Production-path and monitoring checks',
        status: 'Configured; require a running stack',
        provides:
          'npm run test:integration:stack checks HTTP/cache behavior and the monitoring integration. Controlled failure and notification exercises remain separate explicit commands.',
        dependsOn:
          'A prepared Traefik → Varnish → Node.js environment, monitoring services and local credentials. A passing direct-server test is not evidence about Varnish; notification fixtures do not establish delivery to real recipients.',
      },
    ],
  },
  {
    id: 'production',
    name: 'Production — serve the finished build',
    summary:
      'Direct path: npm run build → npm run start → Node.js with Express, GraphQL, sirv and the React Router server build. Docker, a reverse proxy and a cache are not required for this direct path.',
    solutions: [
      {
        id: 'node-production',
        name: 'Node.js HTTP process',
        status: 'In use',
        provides:
          'Runs the built application with npm run start, including GraphQL and the React Router request handler. Vite middleware is used only in development.',
        dependsOn:
          'A completed build, Node.js, production dependencies and a reachable port.',
        children: [
          {
            id: 'express',
            name: 'Express',
            status: 'In use in development and production',
            provides:
              'One application entry point for GraphQL and page handling. Development attaches Vite middleware; production attaches sirv and the React Router server build.',
            dependsOn:
              'Node.js, middleware ordering and shutdown handling. It was adopted for the application/API requirement, not merely to serve files.',
            evidence: {
              label: 'The shared server field note',
              path: '/blog/one-server-two-modes-and-an-api',
            },
          },
          {
            id: 'api',
            name: 'GraphQL — Apollo Server + Pothos',
            status: 'Implemented; minimal health API',
            provides:
              'A typed server schema, a /api endpoint and an embedded query explorer. The health query establishes API reachability; error instrumentation catches GraphQL failures even with HTTP 200.',
            dependsOn:
              'Express, Apollo Server, Pothos and GraphQL. No database, authorization layer or frontend API client has been added. This API shares the application process rather than running as a standalone service.',
          },
          {
            id: 'sirv',
            name: 'sirv',
            status: 'In use',
            provides:
              'Serves files from build/client as Express middleware. Requests not served as files reach the React Router handler; the unknown route returns 404.',
            dependsOn:
              'Express and a completed client build. Cache behavior through Varnish comes from its separate VCL policy; direct Node.js serving must not be assumed to have the same cache behavior.',
          },
        ],
      },
      {
        id: 'process-supervision',
        name: 'Process supervision — for example PM2',
        status: 'Optional alternative; not configured',
        provides:
          'A possible way to supervise the Node.js service instead of running it as a foreground npm process.',
        dependsOn:
          'A supervisor installation and deployment-specific startup/restart configuration. PM2 is an example, not an adopted or verified project dependency; containers are another deployment choice.',
      },
    ],
  },
  {
    id: 'infrastructure',
    name: 'Optional deployment environment — around the application',
    summary:
      'These are deployment choices, not prerequisites for direct Node.js execution. The configured path is Traefik → Varnish → the Node.js application. A server can share one Traefik and one monitoring installation across multiple sites.',
    solutions: [
      {
        id: 'docker',
        name: 'Docker',
        status: 'Optional; configured',
        provides:
          'Packages the service environment into container images for repeatable execution.',
        dependsOn:
          'A Docker runtime, images, storage and networking. Native Node.js execution remains possible.',
        children: [
          {
            id: 'compose',
            name: 'Docker Compose',
            status: 'Optional; configured',
            provides:
              'Describes the app, cache, proxy and monitoring services, with shared definitions and development/production overrides.',
            dependsOn:
              'Docker, images, environment variables, the configured external network, available ports and generated monitoring configuration/secrets. Monitoring currently lives in the base Compose file, without an optional profile.',
            children: [
              {
                id: 'app-container',
                name: 'App service container',
                status: 'Configured',
                provides:
                  'A container boundary around the Node.js application. Development runs Express, GraphQL and Vite middleware; production runs the built server and its runtime dependencies.',
                dependsOn:
                  'The Dockerfile and selected environment configuration. Development mounts source files; production uses the built artifact and server dependencies.',
              },
              {
                id: 'cache-container',
                name: 'Cache service container',
                status: 'Configured for production and development',
                provides:
                  'Runs Varnish in front of the origin, with separate production caching and development pass policies.',
                dependsOn:
                  'The Varnish configuration described below and a reachable app service.',
              },
              {
                id: 'proxy-container',
                name: 'Proxy service container',
                status: 'Configured',
                provides: 'Runs Traefik as a separate entry-point service.',
                dependsOn:
                  'The Traefik configuration described below and reachable upstream services.',
              },
            ],
          },
        ],
      },
      {
        id: 'traefik',
        name: 'Traefik',
        status: 'Optional; configured',
        provides:
          'A shared entry point, TLS termination and routing to the app or cache. Development exposes HTTP and HTTPS together; /__vite_hmr goes directly to the app while page requests go through Varnish.',
        dependsOn:
          'Routing, network and upstream configuration; TLS needs a certificate matching the requested hostname or IP address and browser trust. The development Compose override selects its own dynamic routing directory. Direct npm run dev does not need Traefik. Local Chromium verified HTTPS delivery and WSS updates through the proxy.',
      },
      {
        id: 'varnish',
        name: 'Varnish',
        status: 'Optional; production caching and development pass mode',
        provides:
          'Caches eligible public responses to avoid repeated origin requests. This is an additional delivery capability, not a requirement for React, Vite or Node.js.',
        dependsOn:
          'An HTTP origin and VCL rules. The production policy passes /api and non-GET/HEAD requests, avoids caching non-200 responses, and assigns successful responses one hour or matching asset paths seven days. It removes request cookies and response Set-Cookie headers; it is not a finished policy for authenticated or personalized content. Publication invalidation remains open. Direct development access bypasses Varnish. The development proxy path uses a separate VCL that passes every request and returns X-Cache: PASS and Cache-Control: no-store. It does not test production cache hits.',
      },
    ],
  },
  {
    id: 'observation',
    name: 'Optional observation — evidence about the running system',
    summary:
      'Shared operational monitoring and visitor analytics answer different questions. Monitoring observes one server and its registered sites; useful automation must not be confused with malicious traffic.',
    solutions: [
      {
        id: 'betterlytics',
        name: 'Betterlytics',
        status: 'Optional integration',
        provides: 'A configured script hook for website usage analytics.',
        dependsOn:
          'A site ID, external service and collection policy. The hook does not prove collection is working and does not measure Varnish origin traffic.',
      },
      {
        id: 'monitoring',
        name: 'Shared server monitoring',
        status: 'Implemented; exercised in a local production preview',
        provides:
          'A site registry, internal page/API probes, metrics, logs and alert rules for several sites behind one Traefik. A controlled app pause showed a cached page staying available while the uncached API failed and recovered.',
        dependsOn:
          'Configured sites, reachable services and persistent storage. Seven monitoring containers used roughly 594–714 MiB in short local observations, not a guaranteed ceiling. Same-host probes cannot independently detect total host failure. Browser errors and bot classification are not collected by this integration.',
        evidence: {
          label: 'Monitoring and our open-to-bots strategy',
          path: '/blog/open-to-bots-closed-to-abuse',
        },
        children: [
          {
            id: 'prometheus',
            name: 'Prometheus',
            status: 'Configured and locally checked',
            provides:
              'Stores request rates, statuses, HTTP bytes, latency histograms, probe results and host/application metrics; evaluates alert rules.',
            dependsOn:
              'Scrape targets and storage. Metric retention is 30 days with a 2 GiB TSDB retention limit; temporary WAL/head usage is additional. Missing observations must not be counted as successful uptime.',
          },
          {
            id: 'grafana',
            name: 'Grafana',
            status: 'Provisioned dashboard; locally checked',
            provides:
              'A site selector and views for availability, probe coverage, response times, errors, resources and logs.',
            dependsOn:
              'Prometheus, Loki and provisioned data sources. Login is required; the configured host port binds to loopback. HTTP response duration is not browser page-load time, and request counts are not a human audience estimate.',
          },
          {
            id: 'loki-alloy',
            name: 'Loki + Alloy',
            status: 'Configured and locally checked',
            provides:
              'Collects logs from explicitly labelled containers, maps Traefik routes to sites and removes query strings before Loki ingestion. Log retention is seven days.',
            dependsOn:
              'Docker API access, labels and storage. Alloy is a trusted host-level collector: a read-only socket mount does not restrict Docker API methods. Raw Docker logs can still contain query strings; age-based retention is not a hard disk quota.',
          },
          {
            id: 'exporters',
            name: 'Blackbox Exporter + Node Exporter',
            status: 'Configured and locally checked',
            provides:
              'Page and API checks every 30 seconds through internal Traefik, plus host CPU, memory and filesystem metrics.',
            dependsOn:
              'Registered probe targets and host metric access. Checks originate on the same server and do not prove public DNS/network reachability. Host resources are shared across workloads.',
          },
          {
            id: 'application-metrics',
            name: 'Node.js and GraphQL instrumentation',
            status: 'Implemented',
            provides:
              'Process metrics, event-loop measurements, structured events and client/server GraphQL error counters, including errors returned with HTTP 200.',
            dependsOn:
              'The Prometheus client and a configured separate metrics listener. Metrics are not mounted on the public Express app. This does not report browser JavaScript errors.',
          },
          {
            id: 'alertmanager',
            name: 'Alertmanager',
            status: 'Configured; notification channels optional',
            provides:
              'Groups alerts and recovery events. Optional email and Telegram delivery was exercised against isolated local fixtures.',
            dependsOn:
              'Generated configuration and channel credentials. Real provider authentication and recipient delivery need their own checks. Channels are disabled until configured.',
          },
        ],
      },
      {
        id: 'geo-friendly',
        name: 'GEO-friendly access and selective protection',
        status: 'Strategy defined; filtering and classification open',
        provides:
          'Two requirements: serve legitimate requests efficiently at high volume, and welcome AI systems and other bots to public content while rejecting clearly malicious requests before application work. Monitoring supplies evidence for the owner’s local policy.',
        dependsOn:
          'Representative capacity measurements, site-specific rules and a chosen enforcement mechanism. Useful automation, rejected abuse and uncertain traffic need separate accounting. Current graphs include all traffic; no blocker or classifier is implemented, and GEO gains have not been measured. Public robots.txt currently allows crawling, which does not guarantee indexing or AI citations.',
        evidence: {
          label: 'Open to bots. Closed to abuse.',
          path: '/blog/open-to-bots-closed-to-abuse',
        },
      },
      {
        id: 'request-metrics',
        name: 'Request/cache measurement solution',
        status: 'Implementation open',
        provides:
          'Would quantify Varnish cache hits, misses and origin work over time. HTTP integration tests already check selected cache behavior; Traefik traffic graphs alone do not provide this breakdown.',
        dependsOn:
          'Varnish-specific counters or another verified source, plus an observation window. Dedicated cache-hit/origin-work monitoring remains open alongside the implemented request metrics.',
      },
    ],
  },
  {
    id: 'future',
    name: 'Future branches — technology choices still open',
    summary:
      'These remain requirement areas until a concrete solution is selected. They do not form a mandatory sequence of additions.',
    solutions: [
      {
        id: 'storage',
        name: 'Persistent storage',
        status: 'Open',
        provides: 'Durable shared data where needed.',
        dependsOn:
          'A data model, access boundaries, backups and migrations. No database has been selected; an API does not automatically require a database.',
      },
      {
        id: 'typed-contracts',
        name: 'Typed API/data contracts',
        status: 'Open',
        provides:
          'Pothos already provides a typed server schema. Generated frontend operations, an API client and end-to-end data contracts remain open.',
        dependsOn:
          'A real frontend data interaction and a chosen client/code-generation approach, plus runtime validation where needed.',
      },
      {
        id: 'authorization',
        name: 'Identity and authorization',
        status: 'Open',
        provides: 'Private data and actions restricted to appropriate users.',
        dependsOn:
          'Identity/session requirements, server-side permission rules and security verification. No provider has been selected.',
      },
      {
        id: 'commerce',
        name: 'Payments and transactions',
        status: 'Open',
        provides:
          'Transactional workflows when a real product requirement calls for them.',
        dependsOn:
          'A business flow, provider, trusted processing, durable state and recovery. No payment technology has been selected.',
      },
      {
        id: 'composition',
        name: 'Formal solution composition',
        status: 'Open',
        provides:
          'Could check solution compatibility and dependency obligations automatically.',
        dependsOn:
          'A useful schema and enough complexity to justify maintenance. This list does not require a runtime framework or graph database.',
      },
    ],
  },
]
