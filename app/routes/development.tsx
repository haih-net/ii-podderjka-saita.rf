import type { MetaFunction } from 'react-router'
import { DevelopmentPage } from '../Custom/pages/DevelopmentPage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'

export const handle: SeoHandle = {
  seo: {
    title: 'Развиваю сайт, чтобы он приносил больше заказов',
    description:
      'Сам определяю изменения, улучшаю путь к обращению и проверяю результат работы над сайтом.',
    path: '/development',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { DevelopmentPage as default }
