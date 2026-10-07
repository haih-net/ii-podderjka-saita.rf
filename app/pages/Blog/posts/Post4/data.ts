import type { Post, PostSeo } from '../../interfaces'
import workshop from './assets/testing-workshop.webp'
import workshopSmall from './assets/testing-workshop-small.webp'

export const post4: Post = {
  path: '/blog/the-tests-passed-which-tests',
  title: 'The tests passed. Which tests?',
  description:
    'A green command only tells us about the checks it actually ran. Separating unit, integration and browser tests made the evidence behind HAIH easier to repeat and harder to overstate.',
  date: '2026-10-06',
  dateLabel: '6 October 2026',
  version: '349ed44',
  commit: '349ed447f43298394bdc74dea72546aa922337ec',
  commitUrl:
    'https://github.com/haih-net/haih.site/commit/349ed447f43298394bdc74dea72546aa922337ec',
  image: {
    src: workshop,
    srcSet: `${workshopSmall} 600w, ${workshop} 1440w`,
    alt: 'Three stations on a miniature paper workbench inspect a component, an assembled website and its desktop and mobile views.',
    width: 1440,
    height: 960,
  },
}

export const post4Seo: PostSeo = {
  title: `${post4.title} — HAIH Blog`,
  description: post4.description,
  path: post4.path,
  image: post4.image,
  breadcrumbs: [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post4.title, path: post4.path },
  ],
  article: {
    headline: post4.title,
    published: post4.date,
    version: post4.version,
    commitUrl: post4.commitUrl,
  },
}
