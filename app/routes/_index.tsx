import type { MetaFunction } from 'react-router'
import { HomePage } from '../Custom/pages/HomePage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'

export const handle: SeoHandle = {
  seo: {
    title: 'Поддержка сайта с ИИ — Николай Fi1osof Ланец',
    description:
      'Комплексное сопровождение сайта: исправления, актуальные материалы и развитие с опытом Николая Ланца. От 20 000 ₽ в месяц.',
    path: '/',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { HomePage as default }
