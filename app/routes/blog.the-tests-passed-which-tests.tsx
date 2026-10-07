import type { MetaFunction } from 'react-router'
import { createSeoMeta, unavailableSeoMeta } from '../components/seo/SeoHeaders'
import type { SeoHandle } from '../components/seo/SeoHeaders'
import { post4Seo } from '../pages/Blog/posts/Post4/data'

export const handle: SeoHandle = { seo: post4Seo }
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)

// React Router requires a default export at the route integration boundary.
export { Post4 as default } from '../pages/Blog/posts/Post4'
