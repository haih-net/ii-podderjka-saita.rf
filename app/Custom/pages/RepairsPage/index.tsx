import type * as React from 'react'
import { Link } from 'react-router'
import {
  LandingPage,
  DetailSection,
  SupportSummary,
} from '../../components/LandingPage'
import repairImage from './assets/repair-workshop.png'

export const RepairsPage: React.FC = () => (
  <LandingPage
    kicker="Исправления и обслуживание"
    title="Чтобы важное снова работало."
    intro="Сломанный сайт, неработающая форма или пропавшие изображения — я найду причину и займусь исправлениями. Исходная технология проекта не ограничивает работу."
    visual={
      <img
        src={repairImage}
        alt="Восстановленная бумажная дорожка от формы к конверту"
        width={1254}
        height={1254}
        fetchPriority="high"
      />
    }
  >
    <DetailSection title="Проверяю результат целиком">
      <p>
        Исчезнувшая надпись об ошибке ещё не означает, что проблема решена.
        После изменения проверяю нужный сценарий: можно ли отправить заявку,
        приходит ли она получателю, доступна ли нужная страница.
      </p>
    </DetailSection>
    <DetailSection title="Поддерживаю рабочее состояние">
      <p>
        Определяю необходимые обновления и наблюдение за сбоями, организую
        резервное копирование и проверку восстановления. Учитываю устройство
        сайта и его данные.
      </p>
      <p>
        Разбираюсь в самописных проектах и разных технологиях: PHP, JavaScript,
        Ruby on Rails, .NET. Важны причины проблемы и нужное поведение сайта.
      </p>
    </DetailSection>
    <DetailSection title="После исправления работа продолжается" accent>
      <p>
        Техническое состояние — часть поддержки. Я также обновляю содержание и
        структуру, изучаю обращения и выбираю дальнейшие улучшения. Еженедельные
        отчёты показывают, что сделано и что я заметил.
      </p>
      <p>
        <Link to="/content">Как обновляю материалы ↗</Link>
      </p>
      <p>
        <Link to="/how-it-works">Как начинается работа ↗</Link>
      </p>
    </DetailSection>
    <SupportSummary />
  </LandingPage>
)
