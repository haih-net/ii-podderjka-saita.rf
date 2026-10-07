import type * as React from 'react'
import { LandingStyled, IntroStyled, SummaryStyled } from './styles'

interface LandingPageProps {
  title: string
  kicker: string
  intro: string
  visual: React.ReactNode
  children: React.ReactNode
  note?: string
}

export const LandingPage: React.FC<LandingPageProps> = ({
  title,
  kicker,
  intro,
  visual,
  children,
  note = 'Полное сопровождение · от 20 000 ₽ в месяц',
}) => (
  <LandingStyled>
    <IntroStyled aria-labelledby="page-title">
      <div className="intro-grid">
        <div className="intro-copy">
          <p className="eyebrow">{kicker}</p>
          <h1 id="page-title" tabIndex={-1}>
            {title}
          </h1>
          <p className="intro-text">{intro}</p>
          <a href="#page-details" className="intro-action">
            Подробнее <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="intro-visual">{visual}</div>
      </div>
      <div className="intro-foot">
        <span>{note}</span>
        <span>Николай Ланец / Fi1osof</span>
      </div>
    </IntroStyled>
    <div id="page-details" className="page-details">
      {children}
    </div>
  </LandingStyled>
)

interface DetailSectionProps {
  title: string
  children: React.ReactNode
  accent?: boolean
}

export const DetailSection: React.FC<DetailSectionProps> = ({
  title,
  children,
  accent = false,
}) => (
  <section
    className={accent ? 'detail-section detail-accent' : 'detail-section'}
  >
    <h2>{title}</h2>
    <div className="detail-copy">{children}</div>
  </section>
)

export const SupportSummary: React.FC = () => (
  <SummaryStyled>
    <p className="eyebrow">Одна работа с вашим сайтом</p>
    <h2>
      Поддержка целиком.
      <br />
      От понимания проблемы до изменений.
    </h2>
    <div className="summary-columns">
      <div>
        <h3>Организацию беру на себя</h3>
        <p>
          Изучаю сайт, исправляю ошибки, обновляю материалы и развиваю функции.
          Каждую неделю рассказываю о сделанном и наблюдениях. Вам не нужно
          составлять технические задания.
        </p>
      </div>
      <div>
        <h3>Опыт и помощь ИИ</h3>
        <p>
          Программирую с 2007 года, работал на фрилансе и в СберЛаб. ИИ помогает
          быстрее исследовать проект и выполнять изменения. За выбор решений и
          проверку отвечаю я.
        </p>
      </div>
      <div>
        <h3>От 20 000 ₽ в месяц</h3>
        <p>
          По итогам месяца вы решаете, продолжать ли работу. Если сразу после
          первого месяца сообщите, что недовольны и не хотите продолжать,
          полностью верну оплату за этот месяц.
        </p>
      </div>
    </div>
  </SummaryStyled>
)
