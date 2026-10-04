import type { MetaFunction } from 'react-router'
import { ContentPage } from '../Custom/pages/ServiceDetails/ContentPage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'
export const handle: SeoHandle = {
  seo: {
    title: 'Обновление контента сайта — ИИ-поддержка сайта',
    description:
      'Поддерживаем актуальность товаров, услуг, цен, текстов и изображений. Применяем ИИ для подготовки материалов и проверяем сведения о бизнесе.',
    path: '/services/content',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { ContentPage as default }
