import type { Post, PostSeo } from '../../interfaces'
import twoEntrances from './assets/two-entrances.webp'
import twoEntrancesSmall from './assets/two-entrances-small.webp'

export const post6: Post = {
  path: '/blog/two-protocols-one-development-loop',
  title: 'Two protocols. One development loop.',
  description:
    'HTTP and HTTPS open side by side, updating from the same source. A local HMR fix shows why the browser connection, TLS proxy and cache policy belong to one development requirement.',
  date: '2026-10-06',
  dateLabel: '6 October 2026',
  version: '84a5668',
  commit: '84a5668d50422be96e0062f99c3b0a2c3e51e674',
  commitUrl:
    'https://github.com/haih-net/haih.site/commit/84a5668d50422be96e0062f99c3b0a2c3e51e674',
  image: {
    src: twoEntrances,
    srcSet: `${twoEntrancesSmall} 600w, ${twoEntrances} 1440w`,
    alt: 'Two paper browser entrances, one with a padlock, connect to a shared website workshop and display the same coral page element.',
    width: 1440,
    height: 960,
  },
}

export const post6Seo: PostSeo = {
  title: `${post6.title} — HAIH Blog`,
  description: post6.description,
  path: post6.path,
  image: post6.image,
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post6.title, path: post6.path },
  ],
  article: {
    headline: post6.title,
    published: post6.date,
    version: post6.version,
    commitUrl: post6.commitUrl,
  },
}
