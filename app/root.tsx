import type * as React from 'react'
import { DocumentStyled } from './Custom/components/SiteLayout/styles'
import { SeoHeaders, unavailableSeoMeta } from './components/seo/SeoHeaders'

export const meta = unavailableSeoMeta
import type { ReactNode } from 'react'
import { SiteLayout } from './Custom/components/SiteLayout'
import {
  Links,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from 'react-router'

const betterlyticsId = import.meta.env.BETTERLYTICS_SITE_ID

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <DocumentStyled lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <SeoHeaders />
        <Links />
        {betterlyticsId && (
          <script
            async
            src="https://panel.betterlytics.ru/analytics.js"
            data-site-id={betterlyticsId}
            data-server-url="https://panel.betterlytics.ru/event"
          />
        )}
      </head>
      <body>
        <SiteLayout>{children}</SiteLayout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </DocumentStyled>
  )
}
const App: React.FC = () => {
  return <Outlet />
}

export default App

export const ErrorBoundary: React.FC = () => {
  const error = useRouteError()
  return (
    <>
      <h1 tabIndex={-1}>
        {isRouteErrorResponse(error)
          ? `${error.status} — Не удалось открыть страницу`
          : 'Не удалось открыть страницу'}
      </h1>
      <p>Обновите страницу, чтобы попробовать ещё раз.</p>
      <a href="/">На главную</a>
    </>
  )
}
