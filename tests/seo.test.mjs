import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { canonicalUrl, site } from '../app/components/seo/site.ts'
import { serializeJsonLd } from '../app/components/seo/JsonLd/helpers.ts'

const paths = [
  '/',
  '/services',
  '/how-it-works',
  '/contact',
  '/website-lifecycle',
  '/services/reliability',
  '/services/maintenance',
  '/services/content',
  '/services/improvements',
  '/services/analytics',
  '/services/modernization',
]
const read = (path) =>
  readFileSync(
    new URL(
      `../build/client${path === '/' ? '' : path}/index.html`,
      import.meta.url,
    ),
    'utf8',
  )
const headOf = (html) => html.match(/<head>([\s\S]*?)<\/head>/)[1]

test('canonical URLs normalize paths and reject other domains', () => {
  assert.equal(
    canonicalUrl('/services/?query=1#section'),
    `${site.origin}/services`,
  )
  assert.throws(() => canonicalUrl('https://example.org/'))
})

test('structured data serialization escapes HTML', () => {
  const data = { name: '</script><script>alert(1)</script>' }
  const value = serializeJsonLd(data)
  assert.ok(!value.includes('<'))
  assert.deepEqual(JSON.parse(value), data)
})

test('all public pages prerender Russian content, unique metadata and extracted CSS', () => {
  const titles = new Set()
  const descriptions = new Set()
  const sitemap = readFileSync(
    new URL('../build/client/sitemap.xml', import.meta.url),
    'utf8',
  )
  assert.equal((sitemap.match(/<loc>/g) || []).length, paths.length)
  for (const path of paths) {
    const html = read(path)
    const head = headOf(html)
    assert.match(html, /lang="ru"/)
    assert.equal((html.match(/<h1\b/g) || []).length, 1)
    assert.equal((head.match(/<title>/g) || []).length, 1)
    assert.equal((head.match(/rel="canonical"/g) || []).length, 1)
    titles.add(head.match(/<title>(.*?)<\/title>/)[1])
    descriptions.add(head.match(/name="description" content="([^"]+)"/)[1])
    assert.ok(head.includes(`rel="canonical" href="${canonicalUrl(path)}"`))
    assert.ok(!head.includes('https://haih.site'))
    assert.ok(!head.includes('og:image'))
    assert.ok(sitemap.includes(`<loc>${canonicalUrl(path)}</loc>`))
    const graph = JSON.parse(
      head.match(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
      )[1],
    )['@graph']
    assert.ok(
      graph.some(
        (node) =>
          node['@type'] === 'WebPage' &&
          node.url === canonicalUrl(path) &&
          node.inLanguage === 'ru',
      ),
    )
    const styles = [...head.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)]
    assert.ok(styles.length > 0)
    for (const [, href] of styles)
      assert.ok(existsSync(new URL(`../build/client${href}`, import.meta.url)))
  }
  assert.equal(titles.size, paths.length)
  assert.equal(descriptions.size, paths.length)
})

test('internal links lead to published pages without fragment navigation', () => {
  for (const path of paths) {
    const html = read(path)
    for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
      assert.ok(!href.includes('#'), `${path}: no fragment navigation: ${href}`)
      if (!href.startsWith('/')) continue
      const target = new URL(href, canonicalUrl(path))
      assert.ok(paths.includes(target.pathname), `${path}: ${href}`)
      if (target.hash)
        assert.ok(
          read(target.pathname).includes(`id="${target.hash.slice(1)}"`),
          `${path}: ${href}`,
        )
    }
  }
})

test('unknown pages and inherited template routes return 404 without canonical', async () => {
  const { createRequestHandler } = await import('react-router')
  const build = await import('../build/server/index.js')
  const handler = createRequestHandler(build, 'production')
  for (const path of [
    '/missing-page',
    '/blog',
    '/solutions',
    '/missing-image.png',
  ]) {
    const response = await handler(new Request(`${site.origin}${path}`))
    assert.equal(response.status, 404)
    const head = headOf(await response.text())
    assert.ok(head.includes('noindex'))
    assert.ok(!head.includes('rel="canonical"'))
  }
})

test('outbound links respect one destination site per page and three per site', () => {
  const destinations = new Set()
  for (const path of paths) {
    const perPage = new Set()
    for (const [, href] of read(path).matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
      const target = new URL(href, site.origin)
      if (target.origin === site.origin) continue
      perPage.add(target.hostname)
      destinations.add(target.hostname)
    }
    assert.ok(perPage.size <= 1, `${path}: ${[...perPage]}`)
  }
  assert.ok(destinations.size <= 3, `${[...destinations]}`)
})
