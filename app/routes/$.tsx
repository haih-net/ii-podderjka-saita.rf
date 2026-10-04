import type * as React from 'react'
import { data, Link, type MetaFunction } from 'react-router'
import { unavailableSeoMeta } from '../components/seo/SeoHeaders'

export const meta: MetaFunction = unavailableSeoMeta
export const loader = (): ReturnType<typeof data<null>> =>
  data(null, { status: 404 })
const NotFound: React.FC = () => (
  <article>
    <h1 tabIndex={-1}>Страница не найдена</h1>
    <p>Проверьте адрес или выберите нужный раздел в меню.</p>
    <Link to="/">На главную</Link>
  </article>
)
export default NotFound
