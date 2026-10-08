import type * as React from 'react'
import { UnavailableStyled } from '../Custom/components/SiteLayout/styles'
import { data, Link, type MetaFunction } from 'react-router'
import { unavailableSeoMeta } from '../components/seo/SeoHeaders'

export const meta: MetaFunction = unavailableSeoMeta
export const loader = (): ReturnType<typeof data<{ statusCode: number }>> =>
  data({ statusCode: 404 }, { status: 404 })
const NotFound: React.FC = () => (
  <UnavailableStyled>
    <h1 tabIndex={-1}>Страница не найдена</h1>
    <p>Проверьте адрес или выберите нужный раздел в меню.</p>
    <Link to="/">На главную</Link>
  </UnavailableStyled>
)
export default NotFound
