import type { MetaFunction } from 'react-router'
import { AnalyticsPage } from '../Custom/pages/ServiceDetails/AnalyticsPage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'
export const handle: SeoHandle = {
  seo: {
    title: 'Аналитика в сопровождении сайта — ИИ-поддержка сайта',
    description:
      'Изучаем посещения, ошибки и пользовательские сценарии, чтобы находить проблемы и выполнять полезные изменения в рамках сопровождения сайта.',
    path: '/services/analytics',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { AnalyticsPage as default }
