import type { MetaFunction } from 'react-router'
import { ImprovementsPage } from '../Custom/pages/ServiceDetails/ImprovementsPage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'
export const handle: SeoHandle = {
  seo: {
    title: 'Развитие сайта на сопровождении — ИИ-поддержка сайта',
    description:
      'Сами погружаемся в бизнес-процессы и находим полезные доработки сайта: поиск, формы, каталог, уведомления и интеграции.',
    path: '/services/improvements',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { ImprovementsPage as default }
