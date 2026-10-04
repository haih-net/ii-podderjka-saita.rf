import type { MetaFunction } from 'react-router'
import { HowItWorksPage } from '../Custom/pages/HowItWorksPage'
import {
  createSeoMeta,
  unavailableSeoMeta,
  type SeoHandle,
} from '../components/seo/SeoHeaders'

export const handle: SeoHandle = {
  seo: {
    title: 'Как устроено сопровождение — ИИ-поддержка сайта',
    description:
      'Как начать сопровождение сайта: погружение в бизнес-процессы, самостоятельный поиск улучшений, обслуживание и развитие. Ответы на вопросы и контакт.',
    path: '/how-it-works',
  },
}
export const meta: MetaFunction = ({ error }) =>
  error ? unavailableSeoMeta() : createSeoMeta(handle.seo)
export { HowItWorksPage as default }
