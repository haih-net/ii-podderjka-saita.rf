# Содержание сайта ии-поддержка-сайта.рф

`pages/HomePage/index.tsx` — оформленная главная страница. Основание: направление сопровождения в маркетинговой Wiki (`/wiki/services/site-care`). `components/SiteLayout/` отвечает за общую типографику и фокус. Метаданные главной находятся в `app/routes/_index.tsx`.

Базовая задача создания и последующего размещения всех типовых сайтов этой части: `/wiki/tasks/site-care-website` в проекте `/disks/wd-1000/www/haih/marketing`. Там сохраняются промежуточные цели, способы работы, результаты и выводы. Подготовка сервера остаётся отдельной задачей `/wiki/tasks/server-bootstrap`.

## Текущий этап — 7 октября 2026 года

После правок владельца основная тема — «ИИ-поддержка сайта», соответствующая домену и целевому запросу. Главная написана от первого лица. Основная аудитория — владельцы заброшенных сайтов, которым некогда заниматься развитием. Клиент решает передать сайт в работу; автор сам определяет состав и очередность работ ради большего числа заказов. Подбор задач не перекладывается на клиента. Цена — от 20 000 ₽ в месяц. Замечания, причины переработки и выводы сохранены в базовой Wiki-задаче. Текст остаётся черновиком для дальнейших правок.

## Структура и подача

Each of the ten offer pages is a standalone landing page. Its main topic receives the most detail; supporting sections summarize the service, working process, experience, use of AI and starting price so visitors do not need to follow links to understand the offer. Detail links follow useful summaries instead of replacing them. Each offer page has at most three internal content links; the shared header separately provides the requested home, process, pricing and contact navigation. The pages use the approved light paper-workshop visual direction with cobalt accents. Result charts require real data.

Десять страниц предложения: `/`, `/how-it-works`, `/diagnostics`, `/repairs`, `/content`, `/development`, `/ai`, `/experience`, `/pricing`, `/contact`. Каждая — самостоятельная посадочная с темой, пользой, смысловыми ссылками и общим блоком будущего ИИ-чата. Добавлены общая sticky-шапка с переходом на главную, пунктами «Как работаю», «Стоимость» и видимыми контактами, а также подвал со ссылкой на fi1osof.ru. Контакт — Telegram `https://t.me/Fi1osof`, проверен по указанной владельцем странице `https://fi1osof.ru/about` 7 октября 2026 года.

Предрендеринг и sitemap включают новые страницы. Унаследованные `/solutions` и `/blog` сохранены отдельно и не учитываются в десяти страницах предложения; их дальнейшая судьба остаётся открытой. Главная оформлена в выбранной владельцем светлой стилистике с кобальтовым акцентом и бумажной иллюстрацией. Промпт находится рядом с изображением; служебные подписи о генерации в интерфейс не выводятся. ИИ-помощник ещё не подключён. Страничные компоненты имеют именованные экспорты; тонкие адаптеры используют существующий обязательный для React Router экспорт по умолчанию на границе фреймворка.

## Локальная работа

Из корня сайта: `npm ci`, затем `npm run dev`. Для Docker-разработки запускается только приложение: `docker compose -f docker/compose.yaml -f docker/compose.dev.yaml up -d app`. Свободные порты выбираются с учётом других сайтов.

Проверки: `npm run types`, `npm run build`. Результаты текущей проверки фиксируются в базовой Wiki-задаче. Исторические проверки старого набора страниц не подтверждают работу текущего сайта. Размещение и производственный путь через прокси и кэш в рамках текстовой правки не проверяются.

## Основной способ общения — продающий ИИ-агент

По уточнению владельца от 7 октября на всех сайтах позже появится продающий ИИ-чат. Посетитель сам задаёт вопросы агенту и разбирается в предложении. Личная связь с автором — дополнительная возможность, не основной призыв. Поддержку переданного сайта автор по-прежнему организует сам.

`components/AgentConversation/` показывает краткое описание будущего диалога и честный статус «Чат пока не подключён». Общая оболочка выводит блок на страницах, а контакты содержат собственное описание будущего чата. При подключении интерфейса диалог должен открываться прямо на любой странице; описание будущего чата не считается реализованной интеграцией.

## Complete offer-page design — 7 October 2026

All ten offer pages now share the approved visual direction. The nine inner pages use `components/LandingPage/` for their viewport-height opening, topic sections and compact service context. Mobile layouts start with one column; wider layouts use paired editorial columns. The pricing page has a dedicated offer and refund panel. Experience uses the owner's portrait from the marketing Wiki materials. The repair and content illustrations were generated for these pages; Russian `.prompt.txt` files are colocated with their PNG originals. No production captions are rendered.

The shared sticky header keeps contacts available. The footer links to the owner's website. Keyboard navigation includes a skip link, visible focus and heading focus after SPA navigation. Anchor offsets account for the header. Not-found and rendering-error pages share the visual treatment. The chat remains explicitly disconnected; no conversation backend is claimed. Inherited blog and Solutions content is preserved outside the ten offer pages.

Validation: `npm run types`, `npm run build`, then a temporary production Node server with `PORT=4317 METRICS_PORT= NODE_ENV=production node build/node/index.js` and `PLAYWRIGHT_BASE_URL=http://127.0.0.1:4317 npx playwright test --workers=3`. All 45 browser checks pass in desktop Chromium, WebKit and mobile Chromium. Checks cover all ten direct URLs and refreshes, images, full-width layout, viewport-height heroes, sticky contacts, anchor offsets, SPA history/focus/metadata and 404 responses. Pricing also covers 320, 768 and 1024px widths. Local visual review covered 390 and 1440px; all ten pages were checked for overflow at 320, 390, 768 and 1440px. A tablet pricing overflow was corrected and regression-tested. Build output includes prerendered HTML and extracted CSS for the offer pages. These checks do not verify a deployment through the production proxy/cache chain.

During local editing the style extractor retained a previous selector. Restarting the development process refreshed the extracted CSS; production-build browser checks passed independently. This is not evidence of reliable stylesheet HMR.
