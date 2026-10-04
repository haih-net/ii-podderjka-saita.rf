import type { MetaFunction } from 'react-router'
import { MaintenancePage } from '../Custom/pages/ServiceDetails/MaintenancePage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'
export const handle: SeoHandle = {
  seo: {
    title: 'Техническое обслуживание сайта — ИИ-поддержка сайта',
    description:
      'Берём на себя размещение, обновления, резервное копирование и восстановление сайта. Технические заботы и организация работ — на нас.',
    path: '/services/maintenance',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { MaintenancePage as default }
