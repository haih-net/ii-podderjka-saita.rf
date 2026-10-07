import { test, expect } from '@playwright/test'

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
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  // This property disappears on a document reload, including an accidental anchor navigation.
  await page.evaluate(() => Reflect.set(window, '__spaTest', 'same-document'))
  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Solutions' })
    .click()
  await expect(page).toHaveURL(/\/solutions$/)
  await expect(page).toHaveTitle(
    'Technology choices and their trade-offs — HAIH Solutions',
  )
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://haih.site/solutions',
  )
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused()
  await page.goBack()
  await expect(page).toHaveURL(/\/$/)
  await expect(page).toHaveTitle(
    'HAIH — Building websites with AI, from requirements',
  )
  await page.goForward()
  await expect(page).toHaveURL(/\/solutions$/)
  expect(await page.evaluate(() => Reflect.get(window, '__spaTest'))).toBe(
    'same-document',
  )
  expect(errors).toEqual([])
})

test('public deep links survive refresh', async ({ page }) => {
  const response = await page.goto('/blog/a-small-site-and-the-limits-we-found')
  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  const title: string = await page.title()
  const refreshed = await page.reload()
  expect(refreshed?.status()).toBe(200)
  await expect(page).toHaveTitle(title)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://haih.site/blog/a-small-site-and-the-limits-we-found',
  )
})

test('unknown pages and missing assets return 404', async ({
  page,
  request,
}) => {
  const response = await page.goto('/missing-e2e-page')
  expect(response?.status()).toBe(404)
  await expect(
    page.getByRole('heading', { name: 'Page not found' }),
  ).toBeVisible()
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex/,
  )
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0)
  const asset = await request.get('/assets/missing-e2e.js')
  expect(asset.status()).toBe(404)
})
