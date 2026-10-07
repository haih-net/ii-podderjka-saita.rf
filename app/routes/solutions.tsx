import type { MetaFunction } from 'react-router'
import { createSeoMeta, unavailableSeoMeta } from '../components/seo/SeoHeaders'
import type { SeoHandle } from '../components/seo/SeoHeaders'
import { SolutionsPage } from '../pages/SolutionsPage'
import { layers } from '../pages/SolutionsPage/solutions'
import technologyMap from '../pages/MainPage/TechnologyMap/technology-map.webp'

export const handle = {
  seo: {
    title: 'Technology choices and their trade-offs — HAIH Solutions',
    description:
      'Explore HAIH’s application runtime, testing and shared monitoring: capabilities, requirements, evidence and the open decisions behind GEO-friendly access.',
    path: '/solutions',
    image: {
      src: technologyMap,
      alt: 'A conceptual map of the HAIH build, browser and delivery layers.',
      width: 1440,
      height: 960,
    },
    collection: {
      name: 'HAIH solution layers',
      items: layers.map((layer) => ({
        name: layer.name,
        path: `/solutions#${layer.id}`,
        description: layer.summary,
      })),
    },
    breadcrumbs: [
      { name: 'Home', path: '/' },
      { name: 'Solutions', path: '/solutions' },
    ],
  },
} satisfies SeoHandle

export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
// React Router requires a default export at the route integration boundary.
export { SolutionsPage as default }
