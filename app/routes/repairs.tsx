import type { MetaFunction } from 'react-router'
import { RepairsPage } from '../Custom/pages/RepairsPage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'

export const handle: SeoHandle = {
  seo: {
    title: 'Верну внимание техническому состоянию сайта',
    description:
      'Исправляю ошибки, проверяю формы и важные функции, занимаюсь технической поддержкой сайта.',
    path: '/repairs',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { RepairsPage as default }
