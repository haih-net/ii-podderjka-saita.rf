import type * as React from 'react'
import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router'
import { ShellStyled } from './styles'

export const SiteLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation()
  const action = useNavigationType()
  const previous = useRef(pathname)
  useEffect(() => {
    if (previous.current !== pathname && action !== 'POP') {
      document
        .querySelector<HTMLElement>('#main-content h1')
        ?.focus({ preventScroll: true })
    }
    previous.current = pathname
  }, [pathname, action])
  return (
    <ShellStyled>
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
    </ShellStyled>
  )
}
