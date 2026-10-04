import type * as React from 'react'
import { useEffect, useRef } from 'react'
import { Link, NavLink, useLocation, useNavigationType } from 'react-router'
import { ShellStyled } from './styles'

const focusContent = (): void => {
  document.getElementById('main-content')?.focus()
}

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
      <button type="button" className="skip-link" onClick={focusContent}>
        Перейти к содержанию
      </button>
      <header>
        <Link className="brand" to="/">
          ИИ-поддержка сайта
        </Link>
        <div>Николай Fi1osof Ланец · Практическое применение ИИ</div>
        <nav aria-label="Основная навигация">
          <NavLink to="/" end>
            Главная
          </NavLink>
          <NavLink to="/services">Задачи сопровождения</NavLink>
          <NavLink to="/how-it-works">Как работаем</NavLink>
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <footer>
        <p>
          Николай Fi1osof Ланец — опыт и технологии для заботы о вашем сайте.
        </p>
        <div className="page-links">
          <Link to="/how-it-works">Подход к работе</Link>
          <Link to="/services">Направления сопровождения</Link>
          <Link to="/contact">Обсудить сайт</Link>
        </div>
      </footer>
    </ShellStyled>
  )
}
