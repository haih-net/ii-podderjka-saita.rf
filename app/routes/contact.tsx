import type { MetaFunction } from 'react-router'
import { ContactPage } from '../Custom/pages/ContactPage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'

export const handle: SeoHandle = {
  seo: {
    title: 'Вопросы о поддержке сайта и личная связь',
    description:
      'Планируемый чат с ИИ-помощником для вопросов о поддержке сайта и дополнительный способ личной связи через Telegram.',
    path: '/contact',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { ContactPage as default }
