import type { MetaFunction } from 'react-router'
import { HowItWorksPage } from '../Custom/pages/HowItWorksPage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'

export const handle: SeoHandle = {
  seo: {
    title: 'Передайте сайт — дальнейшую работу я организую сам',
    description:
      'Как устроена поддержка сайта: вопросы о предложении, решение о передаче сайта и самостоятельная организация работ.',
    path: '/how-it-works',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { HowItWorksPage as default }
