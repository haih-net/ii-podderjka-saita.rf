import type { MetaFunction } from 'react-router'
import { ServicesPage } from '../Custom/pages/ServicesPage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'

export const handle: SeoHandle = {
  seo: {
    title: 'Какие задачи берём на себя — ИИ-поддержка сайта',
    description:
      'Работоспособность, техническое сопровождение, контент, аналитика и модернизация сайта. Разбираемся в задаче и подбираем решение для вашего бизнеса.',
    path: '/services',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { ServicesPage as default }
