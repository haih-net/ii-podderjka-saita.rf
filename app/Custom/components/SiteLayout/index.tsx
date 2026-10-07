import type * as React from 'react'
import { useEffect, useRef } from 'react'
import { Link, NavLink, useLocation, useNavigationType } from 'react-router'
import { SiteFrameStyled, HeaderStyled, FooterStyled } from './styles'
import { AgentConversation } from '../AgentConversation'

export const SiteLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation()
  const action = useNavigationType()
  const fullWidth: boolean =
    !pathname.startsWith('/blog') && pathname !== '/solutions'
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
    <SiteFrameStyled data-landing={fullWidth ? 'true' : undefined}>
      <a className="skip-link" href="#main-content">
        К содержанию
      </a>
      <HeaderStyled>
        <Link
          to="/"
          className="site-brand"
          aria-label="ИИ-поддержка сайта — главная"
        >
          <span className="site-mark" aria-hidden="true">
            ИИ
          </span>
          <span>
            Поддержка
            <br />
            сайта
          </span>
        </Link>
        <nav aria-label="Основная навигация">
          <NavLink to="/how-it-works">Как работаю</NavLink>
          <NavLink to="/pricing">Стоимость</NavLink>
        </nav>
        <NavLink to="/contact" className="site-contact">
          Контакты ↗
        </NavLink>
      </HeaderStyled>
      <main id="main-content" tabIndex={-1}>
        {children}
        {pathname.replace(/\/+$/, '') !== '/contact' && (
          <AgentConversation showContactLink={false} />
        )}
      </main>
      <FooterStyled>
        <div className="footer-inner">
          <p>
            <strong>ИИ-поддержка сайта</strong>Сохраняем полезное. Даём сайту
            новые возможности.
          </p>
          <a
            href="https://fi1osof.ru"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Сайт Николая Ланца — открыть в новой вкладке"
          >
            By 𝕱 ↗
          </a>
        </div>
      </FooterStyled>
    </SiteFrameStyled>
  )
}
