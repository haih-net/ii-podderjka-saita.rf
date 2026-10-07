import { Link } from 'react-router'
import { layers, type Solution } from './solutions'

const SolutionList: React.FC<{ items: Solution[] }> = ({ items }) => (
  <ul>
    {items.map((solution) => (
      <li key={solution.id} id={solution.id}>
        <p>
          <strong>
            <a href={`#${solution.id}`}>{solution.name}</a>
          </strong>{' '}
          — {solution.status}
        </p>
        <p>
          <strong>Provides:</strong> {solution.provides}
        </p>
        <details>
          <summary>Requirements and limits</summary>
          <p>{solution.dependsOn}</p>
        </details>
        {solution.evidence && (
          <p>
            <Link to={solution.evidence.path}>{solution.evidence.label}</Link>
          </p>
        )}
        {solution.children && <SolutionList items={solution.children} />}
      </li>
    ))}
  </ul>
)

export const SolutionsPage: React.FC = () => (
  <>
    <h1 tabIndex={-1}>Solutions</h1>
    <p>
      The solutions used to build, serve and observe HAIH: what each provides,
      what adopting it requires and what remains open.
    </p>
    <p>
      Start directly with <code>npm run dev</code>, or build and serve with{' '}
      <code>npm run build</code> then <code>npm run start</code>. Docker,
      Traefik, Varnish and monitoring are deployment choices. The current
      application uses Express, GraphQL and React Router server rendering
      alongside built pages and assets.
    </p>
    <p>
      Nesting shows composition within each layer. Dependencies across layers
      are stated explicitly. “In use” describes this repository; it does not
      claim a comparative benchmark or complete verification.
    </p>
    <p>
      One server can share its Traefik and monitoring across multiple sites.
      Monitoring services currently live in the base Compose configuration;
      there is no dedicated optional profile yet.
    </p>
    <p>
      Our direction pairs performance with openness to AI and other bots.
      Monitoring is implemented; selective blocking and separate traffic
      classification remain local policy work. Read{' '}
      <Link to="/blog/open-to-bots-closed-to-abuse">
        Open to bots. Closed to abuse.
      </Link>{' '}
      and the field note on{' '}
      <Link to="/blog/the-tests-passed-which-tests">
        verification boundaries
      </Link>
      .
    </p>
    <p>
      The development proxy serves the same app over HTTP and HTTPS at once.
      Both views receive React updates through their own page port; development
      Varnish passes requests without caching. Read{' '}
      <Link to="/blog/two-protocols-one-development-loop">
        Two protocols. One development loop.
      </Link>{' '}
      for the local browser check and setup requirements.
    </p>
    <nav aria-label="Solution layers">
      <ul>
        {layers.map((layer) => (
          <li key={layer.id}>
            <a href={`#${layer.id}`}>{layer.name}</a>
          </li>
        ))}
      </ul>
    </nav>
    <ul>
      {layers.map((layer) => (
        <li key={layer.id} id={layer.id}>
          <h2>
            <a href={`#${layer.id}`}>{layer.name}</a>
          </h2>
          <p>{layer.summary}</p>
          <SolutionList items={layer.solutions} />
        </li>
      ))}
    </ul>
  </>
)
