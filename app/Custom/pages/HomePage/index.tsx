import type * as React from 'react'
import { Link } from 'react-router'
import { HomeStyled, HeroStyled } from './styles'
import renewalImage from './assets/renewal-v1.png'

export const HomePage: React.FC = () => (
  <HomeStyled>
    <HeroStyled aria-labelledby="home-title">
      <div className="hero-top">
        <p>НИКОЛАЙ ЛАНЕЦ / Fi1osof</p>
        <span>Поддержка под ключ</span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">Старому сайту — новые возможности</p>
          <h1 id="home-title" tabIndex={-1}>
            ИИ-поддержка <span>сайта</span>
          </h1>
          <p className="hero-description">
            Сайт устарел, сломался или остался без внимания? Я разберусь, что
            мешает ему работать на ваш бизнес, и возьму на себя исправления и
            развитие. Вам не придётся придумывать задачи.
          </p>
          <div className="hero-offer">
            <a href="#working-process">
              Как я работаю <span aria-hidden="true">↓</span>
            </a>
            <p className="hero-price">
              <strong>от 20 000 ₽</strong>в месяц · под ключ
            </p>
          </div>
        </div>
        <figure>
          <img
            src={renewalImage}
            alt="Бумажный макет: старая страница превращается в обновлённую витрину магазина"
            width={1254}
            height={1254}
            fetchPriority="high"
          />
        </figure>
      </div>
      <div className="hero-bottom">
        <span>Опыт веб-разработки с 2007 года</span>
        <span>Выбор решений и проверка результата — на мне</span>
      </div>
    </HeroStyled>
    <div className="home-body">
      <section className="intro-section" aria-labelledby="care-title">
        <p className="section-label">Забота о сайте целиком</p>
        <h2 id="care-title">
          Чтобы сайт развивался,
          <br />а вы занимались бизнесом.
        </h2>
        <p className="section-intro">
          Старый код, неработающие формы, устаревшие тексты — вам не нужно
          разбираться во всём этом и искать исполнителя на каждую задачу. Я сам
          определяю, что мешает сайту, и берусь за работу.
        </p>
        <div className="care-list">
          <section>
            <h3>Разобраться в происходящем</h3>
            <p>
              Подключаю свою систему аналитики, изучаю логи, поведение
              посетителей и роботов. Смотрю, как устроен путь до обращения и где
              он прерывается.
            </p>
          </section>
          <section>
            <h3>Вернуть рабочее состояние</h3>
            <p>
              Нахожу причины ошибок, исправляю формы и функции. Проверяю
              действие целиком: важно не только отправить заявку, но и получить
              её.
            </p>
          </section>
          <section>
            <h3>Обновить содержание</h3>
            <p>
              Пишу и переписываю тексты, создаю изображения, меняю структуру
              страниц с учётом исторических ссылок и накопленного SEO.
            </p>
          </section>
          <section>
            <h3>Продолжать развитие</h3>
            <p>
              Модернизирую сайт и выбираю следующие улучшения. Если для
              расширения тематики нужны дополнительные сайты, занимаюсь и ими.
            </p>
          </section>
        </div>
      </section>
      <section
        className="working-section"
        id="working-process"
        aria-labelledby="working-title"
      >
        <div>
          <p className="section-label">Как устроена работа</p>
          <h2 id="working-title">
            Начнём
            <br />с вашего сайта.
          </h2>
          <p className="section-intro">
            Без технического задания и списка доработок с вашей стороны.
          </p>
        </div>
        <ol className="work-steps">
          <li>
            <h3>Вы сообщаете адрес</h3>
            <p>
              Можно коротко добавить, что нравится и что не устраивает. Для
              начала этого достаточно.
            </p>
          </li>
          <li>
            <h3>Я изучаю и обновляю</h3>
            <p>
              Выполняю первичный анализ и оценку перспектив. Когда начинаем
              работать — модернизирую сайт, подключаю статистику, исправляю и
              развиваю.
            </p>
          </li>
          <li>
            <h3>Вы видите, что меняется</h3>
            <p>
              Каждую неделю рассказываю в отчёте о сделанном и своих
              наблюдениях. По итогам месяца вы решаете, хотите ли продолжать.
            </p>
          </li>
        </ol>
      </section>
      <section
        className="experience-section"
        aria-labelledby="experience-title"
      >
        <div className="experience-year">
          <span>В веб-разработке</span>
          <strong>с 2007</strong>
          <span>Николай Ланец / Fi1osof</span>
        </div>
        <div>
          <p className="section-label">Опыт + возможности ИИ</p>
          <h2 id="experience-title">Разберусь и в вашем проекте.</h2>
          <p>
            Заброшенный сайт, сломанный магазин или неудавшийся стартап —
            исходное состояние и технология не мешают начать. Я умею разбираться
            в чужом коде и работать с накопленной историей проекта.
          </p>
          <p>
            За плечами — фриланс, техническое руководство и работа в СберЛаб
            виртуальной и дополненной реальности. В HappyBaby2000 я связал новую
            витрину с существующей базой, сохранив управление в привычной
            админке.
          </p>
          <p>
            ИИ ускоряет изучение проекта, подготовку материалов и разработку.
            Поэтому я могу предложить комплексную работу за доступную
            ежемесячную сумму. Решения и проверка результата остаются на мне.
          </p>
          <Link to="/experience" className="detail-link">
            Опыт и примеры работы <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="price-section" aria-labelledby="price-title">
        <div>
          <p className="section-label">Полное сопровождение под ключ</p>
          <h2 id="price-title">
            от 20 000 ₽<small>в месяц</small>
          </h2>
          <p>
            Аналитика, технические изменения, материалы и развитие — в одной
            работе с вашим сайтом.
          </p>
        </div>
        <div className="first-month">
          <h3>
            Первый месяц —<br />
            возможность оценить работу.
          </h3>
          <p>
            Если по истечении первого месяца вы сразу сообщите, что недовольны
            моей работой и не хотите продолжать сотрудничество, я полностью
            верну оплату за этот месяц.
          </p>
          <p>
            Еженедельные отчёты помогут увидеть, что сделано и какие возможности
            для развития я нашёл.
          </p>
        </div>
      </section>
    </div>
  </HomeStyled>
)
