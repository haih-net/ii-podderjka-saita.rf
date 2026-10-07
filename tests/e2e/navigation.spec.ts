import { test, expect } from '@playwright/test'

const origin: string = new URL('https://ии-поддержка-сайта.рф').origin
const offerPaths: string[] = [
  '/',
  '/how-it-works',
  '/diagnostics',
  '/repairs',
  '/content',
  '/development',
  '/ai',
  '/experience',
  '/pricing',
  '/contact',
]

test('hydration, SPA navigation, metadata, focus and browser history', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text())
    }
  })
  await page.goto('/')
  const homeTitle: string = await page.title()
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.evaluate(() => Reflect.set(window, '__spaTest', 'same-document'))
  await page
    .getByRole('navigation', { name: 'Основная навигация' })
    .getByRole('link', { name: 'Стоимость' })
    .click()
  await expect(page).toHaveURL(/\/pricing$/)
  await expect(page).toHaveTitle('Поддержка сайта — от 20 000 ₽ в месяц')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    `${origin}/pricing`,
  )
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused()
  await page.goBack()
  await expect(page).toHaveURL(/\/$/)
  await expect(page).toHaveTitle(homeTitle)
  await page.goForward()
  await expect(page).toHaveURL(/\/pricing$/)
  expect(await page.evaluate(() => Reflect.get(window, '__spaTest'))).toBe(
    'same-document',
  )
  expect(errors).toEqual([])
})

for (const path of offerPaths) {
  test(`standalone landing ${path}: direct access, refresh, hero, images and layout`, async ({
    page,
  }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${origin}${path}`,
    )
    const refreshed = await page.reload()
    expect(refreshed?.status()).toBe(200)
    await expect(page.locator('main > article > section').first()).toBeVisible()
    await expect
      .poll(() =>
        page
          .locator('main img')
          .evaluateAll((images) =>
            images.every(
              (image) =>
                image instanceof HTMLImageElement &&
                image.complete &&
                image.naturalWidth > 0,
            ),
          ),
      )
      .toBe(true)
    const geometry = await page.evaluate(() => {
      const main = document.querySelector('main')
      const hero = document.querySelector('main > article > section')
      const header = document.querySelector('header')
      if (!main || !hero || !header) {
        throw new Error('The landing shell is incomplete')
      }
      return {
        overflow: document.documentElement.scrollWidth > innerWidth,
        width: main.getBoundingClientRect().width,
        viewportWidth: innerWidth,
        hero: hero.getBoundingClientRect().height,
        header: header.getBoundingClientRect().height,
        viewportHeight: innerHeight,
      }
    })
    expect(geometry.overflow).toBe(false)
    expect(geometry.width).toBe(geometry.viewportWidth)
    expect(geometry.hero + geometry.header).toBeGreaterThanOrEqual(
      geometry.viewportHeight - 1,
    )
    expect(await page.locator('main a[href^="/"]').count()).toBeLessThanOrEqual(
      3,
    )
    await page
      .getByRole('link', { name: /Подробнее|Как я работаю/ })
      .first()
      .click()
    await expect
      .poll(() =>
        page.evaluate(() => {
          const target = document.querySelector(location.hash)
          return target ? Math.round(target.getBoundingClientRect().top) : -1
        }),
      )
      .toBeGreaterThanOrEqual(Math.floor(geometry.header))
    await page.locator('footer').scrollIntoViewIfNeeded()
    await expect(page.locator('header .site-contact')).toBeInViewport()
    await expect(page.locator('footer a')).toHaveAttribute(
      'href',
      'https://fi1osof.ru',
    )
    expect(errors).toEqual([])
  })
}

for (const width of [320, 768, 1024]) {
  test(`pricing fits at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/pricing')
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true)
    await expect(page.locator('.large-value')).toBeVisible()
  })
}

test('unknown pages and missing assets return 404', async ({
  page,
  request,
}) => {
  const response = await page.goto('/missing-e2e-page')
  expect(response?.status()).toBe(404)
  await expect(
    page.getByRole('heading', { name: 'Страница не найдена' }),
  ).toBeVisible()
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex/,
  )
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0)
  const asset = await request.get('/assets/missing-e2e.js')
  expect(asset.status()).toBe(404)
})
