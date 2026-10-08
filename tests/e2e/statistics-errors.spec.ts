import { expect, test } from '@playwright/test'
import type { StatisticsPacket } from '../../app/components/Statistics/transport'

test('reports the actual 404 page status and clears it after SPA recovery', async ({
  page,
}) => {
  const packets: StatisticsPacket[] = []
  await page.route('**/api/', async (route) => {
    const body = route.request().postDataJSON() as {
      variables: { data: StatisticsPacket }
    }
    packets.push(body.variables.data)
    await route.fulfill({ json: { data: { logStats: [{ id: 'saved' }] } } })
  })
  const response = await page.goto('/.env.33333')
  expect(response?.status()).toBe(404)
  await expect.poll(() => packets.length).toBe(1)
  expect(packets[0].events[0]).toMatchObject({
    statusCode: 404,
    status: 'failed',
  })
  await page.evaluate(() => Reflect.set(window, '__statisticsDocument', 'same'))
  await page.evaluate(() => {
    history.pushState(null, '', '/')
    window.dispatchEvent(new PopStateEvent('popstate'))
  })
  await expect.poll(() => packets.length).toBe(2)
  expect(packets[1].events[0]).toMatchObject({
    statusCode: 200,
    status: 'success',
  })
  await page.goBack()
  await expect.poll(() => packets.length).toBe(3)
  expect(packets[2].events[0]).toMatchObject({
    statusCode: 404,
    status: 'failed',
  })
  await page.goForward()
  await expect.poll(() => packets.length).toBe(4)
  expect(packets[3].events[0]).toMatchObject({
    statusCode: 200,
    status: 'success',
  })
  expect(
    await page.evaluate(() => Reflect.get(window, '__statisticsDocument')),
  ).toBe('same')
  await page.waitForTimeout(200)
  expect(packets).toHaveLength(4)
})

test('reports a route rendering error as failed without first reporting success', async ({
  page,
}) => {
  const packets: StatisticsPacket[] = []
  await page.route('**/api/', async (route) => {
    const body = route.request().postDataJSON() as {
      variables: { data: StatisticsPacket }
    }
    packets.push(body.variables.data)
    await route.fulfill({ json: { data: { logStats: [{ id: 'saved' }] } } })
  })
  await page.route('**/assets/pricing-*.js', (route) =>
    route.fulfill({
      contentType: 'application/javascript',
      body: 'export default function BrokenPage() { throw new Error("Controlled rendering failure") }',
    }),
  )
  await page.goto('/')
  await expect.poll(() => packets.length).toBe(1)
  await page.locator('a[href="/pricing"]:visible').first().click()
  await expect(
    page.getByRole('heading', { name: 'Не удалось открыть страницу' }),
  ).toBeVisible()
  await expect.poll(() => packets.length).toBe(2)
  expect(packets[1].events[0]).toMatchObject({
    statusCode: 500,
    status: 'failed',
  })
  expect(new URL(packets[1].events[0].url).pathname).toBe('/pricing')
  await page.evaluate(() => {
    history.pushState(null, '', '/')
    window.dispatchEvent(new PopStateEvent('popstate'))
  })
  await expect.poll(() => packets.length).toBe(3)
  expect(packets[2].events[0]).toMatchObject({
    statusCode: 200,
    status: 'success',
  })
  await page.waitForTimeout(200)
  expect(packets).toHaveLength(3)
})
