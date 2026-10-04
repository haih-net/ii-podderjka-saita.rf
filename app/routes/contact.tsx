import type { MetaFunction } from 'react-router'
import { ContactPage } from '../Custom/pages/ContactPage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'
export const handle: SeoHandle = {
  seo: {
    title: 'Передать сайт на сопровождение — Николай Fi1osof Ланец',
    description:
      'Передайте заботу о сайте Николаю Ланцу. Достаточно ссылки на сайт: сами изучаем бизнес-процессы и организуем техническое сопровождение.',
    path: '/contact',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { ContactPage as default }
