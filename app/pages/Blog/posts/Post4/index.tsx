import { Link } from 'react-router'
import { author } from '../../../../components/seo/site'
import { post4 as post } from './data'
import { TestingPostStyled } from './styles'

export const Post4: React.FC = () => (
  <TestingPostStyled as="article" className="field-note">
    <header className="field-note-header">
      <Link to="/blog" className="journal-back">
        ← All observations
      </Link>
      <p className="journal-kicker">
        Field notes / 04 · <time dateTime={post.date}>{post.dateLabel}</time>
      </p>
      <h1 tabIndex={-1}>
        The tests passed.
        <br />
        <span>Which tests?</span>
      </h1>
      <p className="field-note-deck">
        We had useful checks. We also had a command that ran only one part of
        them. The next requirement was to make the evidence as understandable as
        the code it describes.
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
          This is a commit checkpoint, not a tagged release. The testing setup
          described here stays tied to this revision as the website evolves.
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
        A component, an assembly, a visitor’s view. Each inspection answers a
        different question. A conceptual illustration, not a diagram of the test
        runner.
      </figcaption>
    </figure>
    <div className="field-note-body">
      <section>
        <p className="journal-kicker">01 / The missing promise</p>
        <h2>A familiar command with a narrow meaning.</h2>
        <p>
          In{' '}
          <Link to="/blog/one-server-two-modes-and-an-api">
            our server field note
          </Link>
          , five HTTP checks helped expose a cache still running old
          instructions. Those tests remained useful. But <code>npm test</code>{' '}
          invoked that particular file, while SEO and monitoring checks lived
          behind separate commands.
        </p>
        <p>
          A successful run therefore meant something narrower than the command
          suggested. It also depended on a running proxy and cache. Someone
          changing a small URL helper could not use the ordinary test command
          for quick, isolated feedback.
        </p>
        <blockquote>
          A test result needs a scope and an environment before it becomes
          evidence.
        </blockquote>
        <p>
          The immediate requirement was simple: discover all unit tests with one
          command. Meeting it properly also meant separating checks that need
          built files, local servers or a real browser. Renaming the scripts
          alone would have preserved the confusion.
        </p>
      </section>
      <section>
        <p className="journal-kicker">02 / Boundaries before tools</p>
        <h2>What does this check need to run?</h2>
        <p>
          We took the command layout of a related project as a starting point,
          then kept only what this website needs. There is no test database to
          reset here. Copying its database setup command would have added an
          obligation without a capability we use.
        </p>
        <div className="testing-layers">
          <div>
            <h3>Unit</h3>
            <p>
              A function and its inputs. No build, listening server or Docker
              stack.
            </p>
          </div>
          <div>
            <h3>Integration</h3>
            <p>
              Real pieces working together: generated HTML, configuration files
              or GraphQL and metrics listeners.
            </p>
          </div>
          <div>
            <h3>Browser</h3>
            <p>A built website opened and navigated through Playwright.</p>
          </div>
        </div>
        <p>
          Vitest now discovers the unit and integration suites independently.
          Playwright owns browser scenarios. These are development dependencies,
          pinned in the package manifest and lockfile; they are not a new
          runtime layer for visitors.
        </p>
      </section>
      <section>
        <p className="journal-kicker">03 / Fast feedback</p>
        <h2>The default command can stay small.</h2>
        <pre className="testing-example">
          <code>{`npm test
npm run test:watch
npm run test:coverage`}</code>
        </pre>
        <p>
          Unit tests live in <code>tests/unit/</code>, with discovery also
          configured for colocated tests in application and server source. The
          environment is Node.js. Adding a matching test file does not require
          adding another package script.
        </p>
        <p>
          The first cases cover canonical URL normalization, rejection of
          foreign origins and safe JSON-LD serialization. Query strings,
          fragments and trailing slashes should not create different canonical
          pages. Text containing a closing script tag must survive serialization
          without becoming executable markup.
        </p>
        <p>
          Coverage is available in the terminal and as HTML and LCOV reports
          under <code>coverage/</code>. Its configured scope is SEO and server
          TypeScript. This is unit coverage; it does not combine the integration
          or browser runs, and a percentage does not tell us whether the right
          behavior was checked.
        </p>
      </section>
      <section>
        <p className="journal-kicker">04 / Real combinations</p>
        <h2>Some tests need more than a function.</h2>
        <pre className="testing-example">
          <code>{`npm run test:integration
npm run test:integration:watch`}</code>
        </pre>
        <p>
          The first command builds the website before running{' '}
          <code>tests/integration/</code>. SEO checks inspect actual generated
          HTML: titles, canonical URLs, descriptions, images, structured data,
          author references and the fixed revisions attached to articles. The
          unknown-route check exercises the built React Router handler and
          expects 404 and noindex.
        </p>
        <p>
          The monitoring configuration test runs the generator in a temporary
          directory. It checks that two sites receive separate probes and
          labels, and that a router cannot belong to both. That is an
          integration with files and a process, even though it requires no
          deployed services.
        </p>
        <p>
          The GraphQL test starts local API and metrics listeners on
          operating-system-assigned ports. A resolver deliberately fails. The
          HTTP response is still 200, so the test also checks that the failure
          appears in the server-error metric. Cleanup is registered as resources
          are acquired, and temporary environment values are restored.
        </p>
        <aside className="field-note-margin">
          <strong>Watch mode has a boundary.</strong>
          <p>
            The integration watcher reruns tests. It does not rebuild the
            website. Build once before starting it, and rebuild after changes
            that affect the generated pages or server bundle.
          </p>
        </aside>
      </section>
      <section>
        <p className="journal-kicker">05 / The visitor’s path</p>
        <h2>A browser can catch what HTML inspection cannot.</h2>
        <pre className="testing-example">
          <code>{`npx playwright install chromium webkit
npm run e2e
npm run e2e:webkit
npm run e2e:ui
npm run e2e:report`}</code>
        </pre>
        <p>
          By default, Playwright builds the site and starts its production
          Node.js server on port 4317. It refuses to reuse an existing listener
          there. Linux hosts may need browser system dependencies as well as the
          downloaded binaries.
        </p>
        <p>
          Three scenarios run in desktop Chromium, desktop WebKit and mobile
          Chromium. They cover navigation with browser history and metadata
          updates, opening and refreshing a blog deep link, and unknown pages
          and missing assets returning 404.
        </p>
        <p>
          The navigation scenario also checks heading focus and watches for
          browser errors. A marker placed on the window must survive the
          transition and back/forward navigation: a full document reload would
          erase it. These are concrete observations about the tested path, not a
          general proof that every component hydrates correctly.
        </p>
        <p>
          Failures retain traces and screenshots; an HTML report helps inspect
          the result. To use an existing environment, set{' '}
          <code>PLAYWRIGHT_BASE_URL</code>. In that mode Playwright neither
          builds nor starts the application, so preparing the correct revision
          becomes the caller’s responsibility.
        </p>
      </section>
      <section>
        <p className="journal-kicker">06 / The infrastructure boundary</p>
        <h2>A local server cannot stand in for Varnish.</h2>
        <pre className="testing-example">
          <code>{`TEST_URL=http://haih.localhost \\\nMONITORING_TEST_URL=http://127.0.0.1:18080 \\\nGRAFANA_TEST_URL=http://127.0.0.1:13000 \\\nnpm run test:integration:stack`}</code>
        </pre>
        <p>
          The separate stack suite expects an already running production
          preview. The site URL must pass through Traefik and Varnish; the
          monitoring checks also need provisioned services and the local Grafana
          password file. The addresses above are an example, not automatic
          provisioning.
        </p>
        <p>
          This suite preserves checks for cache hits and TTL limits, uncached
          failures, HTTP methods, API availability, probes, metrics, log
          filtering and the dashboard. Missing infrastructure is a failure, not
          a silently skipped success.
        </p>
        <p>
          Failure injection and notification fixtures stay behind explicit
          commands. One pauses the preview application; the other uses local
          SMTP and Telegram API fixtures. Ordinary test discovery does not start
          those operational exercises.
        </p>
      </section>
      <section className="field-note-ending">
        <p className="journal-kicker">07 / Evidence, with its limits</p>
        <h2>A smaller claim we can repeat.</h2>
        <ul className="testing-evidence">
          <li>9 unit cases passed without a running application.</li>
          <li>
            10 local integration checks passed against the generated build and
            isolated fixtures.
          </li>
          <li>
            3 browser scenarios passed in each of 3 projects: 9 Playwright
            executions.
          </li>
          <li>
            Type checking, lint and the unit coverage command completed
            successfully.
          </li>
        </ul>
        <p>
          Those counts describe the testing checkpoint linked above, before this
          article was added. The Docker stack was stopped during that
          verification, so the migrated Varnish and Grafana checks were not
          rerun. The local browser run does not establish cache behavior,
          development HMR, complete accessibility or performance. Lazy-chunk
          failures and broader error-recovery paths still need focused coverage.
        </p>
        <p>
          The{' '}
          <a
            href={`https://github.com/haih-net/haih.site/tree/${post.commit}/tests`}
          >
            versioned tests
          </a>{' '}
          and{' '}
          <a
            href={`https://github.com/haih-net/haih.site/blob/${post.commit}/README.md#tests`}
          >
            commands and prerequisites
          </a>{' '}
          make the result inspectable. They also expose the cost: a small unit
          suite is cheap to run, while browser binaries and a provisioned
          monitoring stack require additional resources.
        </p>
        <p>
          For an AI-assisted workflow, that distinction matters. “Tests passed”
          is easy to report. Naming the behavior, revision and environment makes
          the statement useful. The next requirement can now bring its own check
          into a known place, with a command that actually finds it.
        </p>
      </section>
      <footer className="field-note-footer">
        <p>
          Written against {post.version}. The illustration is conceptual;
          technical claims refer to the linked project snapshot.
        </p>
        <Link to="/blog">← Back to the field notes</Link>
      </footer>
    </div>
  </TestingPostStyled>
)
