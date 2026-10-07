import type { MetaFunction } from 'react-router'
import { ExperiencePage } from '../Custom/pages/ExperiencePage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'

export const handle: SeoHandle = {
  seo: {
    title: 'У меня более 19 лет опыта веб-разработки',
    description:
      'Мой опыт разработки, технического руководства и работы с бизнес-процессами помогает развивать существующие сайты.',
    path: '/experience',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { ExperiencePage as default }
