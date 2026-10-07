import type * as React from 'react'
import { Link } from 'react-router'
import {
  LandingPage,
  DetailSection,
  SupportSummary,
} from '../../components/LandingPage'
import portrait from './assets/nikolai-lanets.jpg'

export const ExperiencePage: React.FC = () => (
  <LandingPage
    kicker="Николай Ланец / Fi1osof"
    title="Опыт, который помогает разобраться."
    intro="Программирую с 2007 года. Занимался разработкой, техническим руководством и развитием проектов — от чужого кода до бизнес-процессов."
    visual={
      <img
        className="portrait"
        src={portrait}
        alt="Николай Ланец"
        width={881}
        height={1024}
        fetchPriority="high"
      />
    }
  >
    <DetailSection title="Смотреть на проект целиком">
      <p>
        Работал на фрилансе и в СберЛаб виртуальной и дополненной реальности,
        где был тимлидом, техлидом и ведущим программистом. Этот опыт помогает
        связывать технические решения с назначением системы.
      </p>
      <p>
        <a href="https://fi1osof.ru/about">Подробнее обо мне ↗</a>
      </p>
    </DetailSection>
    <DetailSection title="HappyBaby2000: сохранить привычную работу">
      <p>
        Связал новую публичную часть магазина с существующей базой MODX.
        Управление осталось в знакомой админке, а витрина получила новую
        реализацию. В проекте также работает агент, который помогает находить
        товары и показывает их карточки.
      </p>
    </DetailSection>
    <DetailSection title="Pivkarta: обновить старый портал">
      <p>
        Работа со старым проектом включала исследование накопленных данных,
        сохранение нужных публичных сценариев и исторических URL. В разборе
        проекта описаны миграция, проверки совместимости и результаты конкретной
        итерации.
      </p>
      <p>
        <a href="https://freecode.academy/topics/haih-na-praktike-kak-my-zamenili-legacy-sayt-ne-perenosya-ego-arhitekturu">
          Разбор модернизации Pivkarta ↗
        </a>
      </p>
    </DetailSection>
    <DetailSection title="Применить этот опыт к вашему сайту" accent>
      <p>
        Разрабатываю собственные инструменты, включая shopModx и modxSDK,
        использую готовые решения и ИИ. Начинаю с задачи проекта. Для вас это
        означает самостоятельное изучение, выбор работ и проверку результата.
      </p>
      <p>
        <Link to="/development">Модернизация и развитие ↗</Link>
      </p>
      <p>
        <Link to="/ai">Как помогает ИИ ↗</Link>
      </p>
    </DetailSection>
    <SupportSummary />
  </LandingPage>
)
