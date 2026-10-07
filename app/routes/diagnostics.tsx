import type { MetaFunction } from 'react-router'
import { DiagnosticsPage } from '../Custom/pages/DiagnosticsPage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'

export const handle: SeoHandle = {
  seo: {
    title: 'Что мешает сайту приносить заказы',
    description:
      'Изучаю сайт, путь посетителя к обращению и получение заявок, чтобы определить полезные изменения.',
    path: '/diagnostics',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { DiagnosticsPage as default }
