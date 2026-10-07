import type { MetaFunction } from 'react-router'
import { HomePage } from '../Custom/pages/HomePage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'

export const handle: SeoHandle = {
  seo: {
    title: 'ИИ-поддержка сайта — верну вашему сайту внимание и развитие',
    description:
      'Сайтом некому заниматься? Передайте его мне: сам определю работы и займусь развитием, чтобы он приносил больше заказов. ИИ-поддержка сайта от 20 000 ₽ в месяц.',
    path: '/',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { HomePage as default }
