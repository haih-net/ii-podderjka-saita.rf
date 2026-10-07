import type { Post, PostSeo } from '../../interfaces'
import observatory from './assets/open-to-bots.webp'
import observatorySmall from './assets/open-to-bots-small.webp'

export const post5: Post = {
  path: '/blog/open-to-bots-closed-to-abuse',
  title: 'Open to bots. Closed to abuse.',
  description:
    'AI crawlers belong on the open web. Our strategy pairs performance with access for legitimate automation; shared monitoring lays the groundwork for rejecting malicious requests without shutting useful bots out.',
  date: '2026-10-06',
  dateLabel: '6 October 2026',
  version: 'ff06b51',
  commit: 'ff06b5113a189624ed0c002e8ccbd4bd5fdf507b',
  commitUrl:
    'https://github.com/haih-net/haih.site/commit/ff06b5113a189624ed0c002e8ccbd4bd5fdf507b',
  image: {
    src: observatory,
    srcSet: `${observatorySmall} 600w, ${observatory} 1440w`,
    alt: 'A single left-to-right flow carries people and green bots through an open gateway to websites, while a red bot stops before it. Grafana, Prometheus and Traefik emblems overlook the scene.',
    width: 1440,
    height: 960,
  },
}

export const post5Seo: PostSeo = {
  title: `${post5.title} — HAIH Blog`,
  description: post5.description,
  path: post5.path,
  image: post5.image,
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post5.title, path: post5.path },
  ],
  article: {
    headline: post5.title,
    published: post5.date,
    version: post5.version,
    commitUrl: post5.commitUrl,
  },
}
