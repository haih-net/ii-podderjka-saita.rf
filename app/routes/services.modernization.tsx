import type { MetaFunction } from 'react-router'
import { ModernizationPage } from '../Custom/pages/ServiceDetails/ModernizationPage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'
export const handle: SeoHandle = {
  seo: {
    title: 'Модернизация сайта в рамках сопровождения — ИИ-поддержка сайта',
    description:
      'Обновляем существующий сайт с учётом данных, привычных процессов и задач бизнеса. Подбираем объём изменений и организуем переход.',
    path: '/services/modernization',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { ModernizationPage as default }
