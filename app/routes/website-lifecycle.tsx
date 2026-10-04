import type { MetaFunction } from 'react-router'
import { WebsiteLifecyclePage } from '../Custom/pages/WebsiteLifecyclePage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'

export const handle: SeoHandle = {
  seo: {
    title: 'Полный цикл работы с сайтом: этапы и специалисты',
    description:
      'Почему сайту нужен специалист, связывающий бизнес и технологии. 14 этапов: от передачи сайта и обновления до обработки заказов и постоянного развития.',
    path: '/website-lifecycle',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { WebsiteLifecyclePage as default }
