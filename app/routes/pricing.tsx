import type { MetaFunction } from 'react-router'
import { PricingPage } from '../Custom/pages/PricingPage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'

export const handle: SeoHandle = {
  seo: {
    title: 'Поддержка сайта — от 20 000 ₽ в месяц',
    description:
      'Поддержка сайта от 20 000 ₽ в месяц. Беру на себя определение задач и развитие сайта.',
    path: '/pricing',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { PricingPage as default }
