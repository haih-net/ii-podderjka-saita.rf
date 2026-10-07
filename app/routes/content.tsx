import type { MetaFunction } from 'react-router'
import { ContentPage } from '../Custom/pages/ContentPage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'

export const handle: SeoHandle = {
  seo: {
    title: 'Помогу сайту понятно говорить о вашем бизнесе',
    description:
      'Обновляю устаревшие страницы и материалы, чтобы посетитель понимал предложение и мог обратиться.',
    path: '/content',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { ContentPage as default }
