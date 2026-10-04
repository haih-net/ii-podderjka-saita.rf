import type { MetaFunction } from 'react-router'
import { ReliabilityPage } from '../Custom/pages/ServiceDetails/ReliabilityPage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'
export const handle: SeoHandle = {
  seo: {
    title: 'Работоспособность сайта — ИИ-поддержка сайта',
    description:
      'Поддерживаем работу сайта, форм и заказов: сами выявляем сбои, разбираемся в причинах и проверяем результат исправлений.',
    path: '/services/reliability',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { ReliabilityPage as default }
