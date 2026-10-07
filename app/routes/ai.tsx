import type { MetaFunction } from 'react-router'
import { AiPage } from '../Custom/pages/AiPage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'

export const handle: SeoHandle = {
  seo: {
    title: 'ИИ в поддержке сайта: мой рабочий инструмент',
    description:
      'Использую ИИ для изучения проекта, подготовки материалов и разработки. Решения принимаю и проверяю сам.',
    path: '/ai',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { AiPage as default }
