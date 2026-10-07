import { Link } from 'react-router'
import { author } from '../../../../components/seo/site'
import { post6 as post } from './data'
import { DevelopmentPostStyled } from './styles'

export const Post6: React.FC = () => (
  <DevelopmentPostStyled as="article" className="field-note">
    <header className="field-note-header">
      <Link to="/blog" className="journal-back">
        ← All observations
      </Link>
      <p className="journal-kicker">
        Field notes / 06 · <time dateTime={post.date}>{post.dateLabel}</time>
      </p>
      <h1 tabIndex={-1}>
        Two protocols.
        <br />
        <span>One development loop.</span>
      </h1>
      <p className="field-note-deck">
        Open HTTP and HTTPS beside each other. Edit one component. Watch both
        pages change. Making that ordinary workflow reliable meant following the
        connection all the way from the browser to the source.
      </p>
      <p className="journal-byline">
        By{' '}
        <a href={author.url} rel="author">
          {author.name}
        </a>{' '}
        · <a href={author.sameAs[0]}>ORCID</a>
      </p>
      <aside
        className="journal-snapshot"
        aria-label="Project revision discussed in this article"
      >
        <span>
          Observed project revision{' '}
          <strong>
            <a href={post.commitUrl}>{post.version}</a>
          </strong>
        </span>
        <span>
          Commit{' '}
          <a href={post.commitUrl}>
            <code>{post.commit.slice(0, 7)}</code>
          </a>
        </span>
        <p>
          A local development checkpoint, not a tagged release. The
          implementation reference stays fixed as the site changes.
        </p>
      </aside>
    </header>
    <figure className="field-note-cover">
      <img
        src={post.image.src}
        srcSet={post.image.srcSet}
        sizes="(min-width: 72rem) 1088px, (min-width: 48rem) calc(100vw - 64px), calc(100vw - 32px)"
        width={1440}
        height={960}
        fetchPriority="high"
        alt={post.image.alt}
      />
      <figcaption>
        Two entrances into the same workshop. A conceptual illustration, not a
        network diagram.
      </figcaption>
    </figure>
    <div className="field-note-body">
      <section>
        <p className="journal-kicker">01 / A useful everyday capability</p>
        <h2>Keep both views open.</h2>
        <p>
          Our{' '}
          <Link to="/blog/one-server-two-modes-and-an-api">shared server</Link>{' '}
          already gave the frontend and API one application entry point. The
          next requirement was smaller: make the development site usable over
          HTTP and HTTPS at the same time, including live component updates.
        </p>
        <p>
          That lets us inspect the TLS entry point while keeping a plain HTTP
          view available. There is no need to switch a configuration, restart
          the application or maintain a second copy of the source just to move
          between those two views. Both pages reach the same running app.
        </p>
        <div className="protocol-pair">
          <div>
            <h3>HTTP · 8080</h3>
            <p>
              <code>http://haih.localhost:8080</code>
            </p>
            <p>Page requests through the proxy. Live updates over WebSocket.</p>
          </div>
          <div>
            <h3>HTTPS · 8443</h3>
            <p>
              <code>https://haih.localhost:8443</code>
            </p>
            <p>The same app through TLS. Live updates over secure WebSocket.</p>
          </div>
        </div>
        <p>
          These are two browser origins, not two applications. Sharing source
          does not synchronize their browser state or establish that future
          authentication, storage or API workflows behave identically. It gives
          us a convenient place to investigate those differences when needed.
        </p>
      </section>
      <section>
        <p className="journal-kicker">02 / The first fix stopped too early</p>
        <h2>A published port was only part of the answer.</h2>
        <p>
          The initial change exposed Vite’s separate HMR port through Docker.
          That addressed reachability for a plain WebSocket connection. It did
          not make that listener a TLS endpoint. An HTTPS page could load while
          its secure update connection still failed.
        </p>
        <p>
          During review, the first response was to document the limitation. The
          owner pushed back: working development over HTTPS was the job.
          Recording why it failed was useful diagnosis, but it did not satisfy
          the requirement.
        </p>
        <blockquote>
          A limitation can be accurately documented while the requested work
          remains unfinished.
        </blockquote>
        <p>
          Looking at the whole path suggested a simpler arrangement. The app
          already had an HTTP server. Traefik already handled TLS. Vite could
          attach its WebSocket server to that existing app listener instead of
          making the browser reach another published port.
        </p>
      </section>
      <section>
        <p className="journal-kicker">03 / Follow the page’s address</p>
        <h2>One update path, whichever entrance you use.</h2>
        <p>
          Vite now uses <code>/__vite_hmr</code> on the Node HTTP server. The
          browser derives the host, port and WebSocket protocol from its page
          address. The HTTP tab connects with <code>ws://</code>; the HTTPS tab
          connects with <code>wss://</code>. No domain is hardcoded into the HMR
          configuration.
        </p>
        <pre className="development-example">
          <code>{`HTTP page  :8080 → ws://haih.localhost:8080/__vite_hmr
HTTPS page :8443 → wss://haih.localhost:8443/__vite_hmr

Page → Traefik → Varnish (pass) → app
HMR  → Traefik → app WebSocket`}</code>
        </pre>
        <p>
          Traefik terminates TLS and sends the update connection directly to the
          app. The container’s application port remains 3000. Direct development
          access on host port 3001 also uses that same listener; there is no
          separate 24678 port to publish or coordinate.
        </p>
        <p>
          This composition uses capabilities of tools already present in the
          project. Its value is the resulting workflow: the page and its update
          connection agree about how the browser reaches the site.
        </p>
      </section>
      <section>
        <p className="journal-kicker">
          04 / Fresh source needs a fresh response
        </p>
        <h2>The cache needs a development policy.</h2>
        <p>
          A working WebSocket is not enough if a refresh retrieves yesterday’s
          HTML or module. We kept Varnish in the page request path, but gave
          development its own VCL: pass every request and return{' '}
          <code>X-Cache: PASS</code> with <code>Cache-Control: no-store</code>.
        </p>
        <p>
          Production keeps its separate cache policy. Development can still be
          used for deliberate caching experiments by selecting another VCL, but
          ordinary source editing no longer depends on remembering to clear a
          production-style cache.
        </p>
        <p>
          Starting the actual services caught another integration error. Docker
          could not mount an extra routing file inside an already read-only
          dynamic-configuration directory. Selecting a complete development
          directory fixed the startup failure. Configuration written on disk
          became evidence only after Traefik actually started with it.
        </p>
      </section>
      <section>
        <p className="journal-kicker">05 / The check follows the claim</p>
        <h2>Two tabs. One edit. No document reload.</h2>
        <p>
          Following the principle from{' '}
          <Link to="/blog/the-tests-passed-which-tests">our testing note</Link>,
          we checked the running local Docker path in Chromium. The browser
          accepted the self-signed development certificate. HTTP and HTTPS pages
          were open together during the same source edit.
        </p>
        <ol className="development-evidence">
          <li>
            Both pages opened and connected to their respective WS and WSS
            endpoints.
          </li>
          <li>
            A temporary visible element was added to a React component. It
            appeared in both tabs.
          </li>
          <li>
            A marker on each window survived the update, showing that neither
            document reloaded.
          </li>
          <li>
            Restoring the source removed the element from both tabs. A separate
            HTTPS refresh check returned current content through Varnish.
          </li>
        </ol>
        <p>
          Type checking, the production build and Compose configuration checks
          also passed for the implementation. They answer different questions
          from the live browser experiment. This was a focused check, not a new
          HMR scenario added to the ordinary production browser suite.
        </p>
        <aside className="field-note-margin">
          <strong>The boundary of this result</strong>
          <p>
            We checked a React component edit in local Chromium. We did not
            establish every Linaria style update, preservation of all component
            state, other browsers or remote-device access. Accepting a
            self-signed certificate in the test does not install a trusted
            certificate on someone else’s machine.
          </p>
        </aside>
      </section>
      <section className="field-note-ending">
        <p className="journal-kicker">06 / What it costs to use</p>
        <h2>A small feature that closes a real gap.</h2>
        <p>
          The proxied setup needs Docker, the configured network, available
          ports and a local TLS certificate. The{' '}
          <a
            href={`https://github.com/haih-net/haih.site/blob/${post.commit}/README.md#local-tls-certificates`}
          >
            versioned setup guide
          </a>{' '}
          records the commands. Start the app, Varnish and Traefik together;
          there is no need to start monitoring just to try this workflow.
        </p>
        <p>
          Direct <code>npm run dev</code> remains available when the proxy is
          unnecessary. For work that does involve TLS, the two views can now
          stay open throughout an edit. That is the useful result of this
          checkpoint: fewer interruptions between writing a change and seeing it
          through the entry point we wanted to test.
        </p>
        <p>
          See the{' '}
          <Link to="/solutions#development-http-https">
            development solution
          </Link>{' '}
          for its requirements and current verification boundary.
        </p>
      </section>
      <footer className="field-note-footer">
        <p>
          Written against {post.version}. Local browser observations were made
          on 6 October 2026. The AI-generated illustration is conceptual; the
          connection checks provide the technical evidence.
        </p>
        <Link to="/blog">← Back to the field notes</Link>
      </footer>
    </div>
  </DevelopmentPostStyled>
)
