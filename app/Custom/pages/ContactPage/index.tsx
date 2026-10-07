import type * as React from 'react'
import { Link } from 'react-router'
import {
  LandingPage,
  DetailSection,
  SupportSummary,
} from '../../components/LandingPage'

export const ContactPage: React.FC = () => (
  <LandingPage
    kicker="Вопросы и личная связь"
    title="Начнём с вашего сайта."
    intro="Хотите обсудить поддержку лично — напишите мне в Telegram. Достаточно адреса сайта; можно коротко рассказать, что вам нравится и что не устраивает."
    visual={
      <div className="visual-sheet">
        <p className="visual-label">Личная связь</p>
        <h2>Николай Ланец</h2>
        <p>Fi1osof · веб-разработка с 2007 года</p>
        <hr />
        <a className="contact-link" href="https://t.me/Fi1osof">
          @Fi1osof <span aria-hidden="true">↗</span>
        </a>
        <p className="contact-note">Написать в Telegram</p>
      </div>
    }
  >
    <DetailSection title="Разобраться в предложении">
      <p>
        На сайте появится ИИ-помощник: с ним можно будет задавать вопросы и
        обсуждать, подходит ли вам поддержка. Сейчас чат ещё не подключён.
        Личная связь со мной доступна в Telegram.
      </p>
    </DetailSection>
    <DetailSection title="Сайт в любом состоянии">
      <p>
        Заброшенный проект, сломанный сайт, неудавшийся стартап или давно не
        обновлявшийся магазин — я разберусь в его устройстве. Работать можно с
        разными технологиями, включая самописные решения.
      </p>
      <p>
        После знакомства выполняю первичный анализ, оцениваю состояние и
        перспективы. Дальнейшие работы и их очередность определяю сам.
      </p>
      <p>
        <Link to="/development">Как развиваю существующие сайты ↗</Link>
      </p>
    </DetailSection>
    <DetailSection title="Полная забота вместо отдельных задач" accent>
      <p>
        Исправляю ошибки, подключаю аналитику, обновляю содержание и функции.
        Каждую неделю сообщаю о работе и наблюдениях. Опыт и помощь ИИ позволяют
        быстрее разбираться в проекте и выполнять изменения.
      </p>
      <p>
        <Link to="/experience">Мой опыт ↗</Link>
      </p>
    </DetailSection>
    <SupportSummary />
  </LandingPage>
)
