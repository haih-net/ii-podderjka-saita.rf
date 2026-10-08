import { test, assert } from 'vitest'
import { readFileSync, existsSync } from 'node:fs'
import { author, canonicalUrl } from '../../app/components/seo/site.ts'

const paths = [
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
  '/solutions',
  '/blog',
  '/blog/two-protocols-one-development-loop',
  '/blog/open-to-bots-closed-to-abuse',
  '/blog/the-tests-passed-which-tests',
  '/blog/a-small-site-and-the-limits-we-found',
  '/blog/one-server-two-modes-and-an-api',
  '/blog/eighteen-hours-a-real-portal-in-production',
]
const read = (path) =>
  readFileSync(
    new URL(
      `../../build/client${path === '/' ? '' : path}/index.html`,
      import.meta.url,
    ),
    'utf8',
  )
const headOf = (html) => html.match(/<head>([\s\S]*?)<\/head>/)[1]
const graphOf = (head) =>
  JSON.parse(
    head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1],
  )['@graph']

test('every public page has unique canonical and metadata in prerendered head', () => {
  const descriptions = new Set()
  const sitemap = readFileSync(
    new URL('../../build/client/sitemap.xml', import.meta.url),
    'utf8',
  )
  for (const path of paths) {
    const html = read(path)
    const head = headOf(html)
    assert.match(html, /lang="ru"/)
    assert.equal((html.match(/<h1\b/g) || []).length, 1)
    const styles = [...head.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)]
    assert.ok(styles.length > 0)
    for (const [, href] of styles) {
      assert.ok(
        existsSync(new URL(`../../build/client${href}`, import.meta.url)),
      )
    }
    const canonical = canonicalUrl(path)
    assert.equal((head.match(/<title>/g) || []).length, 1)
    assert.equal((head.match(/rel="canonical"/g) || []).length, 1)
    assert.ok(head.includes(`rel="canonical" href="${canonical}"`))
    assert.ok(head.includes(`property="og:url" content="${canonical}"`))
    assert.equal((head.match(/name="description"/g) || []).length, 1)
    assert.equal((head.match(/application\/ld\+json/g) || []).length, 1)
    assert.ok(!head.includes('localhost'))
    const description = head.match(/name="description" content="([^"]+)"/)[1]
    assert.ok(description.length > 60)
    descriptions.add(description)
    assert.ok(
      head.includes(`property="og:description" content="${description}"`),
    )
    assert.ok(
      head.includes(`name="twitter:description" content="${description}"`),
    )
    if (path === '/solutions' || path.startsWith('/blog')) {
      const image = head.match(/property="og:image" content="([^"]+)"/)[1]
      assert.equal(
        new URL(image).origin,
        'https://xn-----7kcbauaijpauj5couvu.xn--p1ai',
      )
      assert.ok(
        existsSync(
          new URL(
            `../../build/client${new URL(image).pathname}`,
            import.meta.url,
          ),
        ),
      )
      assert.ok(head.includes('property="og:image:alt"'))
    } else {
      assert.ok(!head.includes('property="og:image"'))
    }
    assert.ok(
      graphOf(head).some(
        (node) =>
          ['WebPage', 'CollectionPage'].includes(node['@type']) &&
          node.url === canonical,
      ),
    )
    assert.ok(sitemap.includes(`<loc>${canonical}</loc>`))
  }
  assert.equal(descriptions.size, paths.length)
})

test('homepage describes the website, without presenting it as a software product', () => {
  const graph = graphOf(headOf(read('/')))
  const website = graph.find((node) => node['@type'] === 'WebSite')
  assert.equal(website.name, 'ИИ-поддержка сайта')
  assert.equal(website.url, 'https://xn-----7kcbauaijpauj5couvu.xn--p1ai/')
  assert.ok(website.description.includes('Сопровождение сайта'))
  assert.ok(
    !graph.some((node) =>
      ['Product', 'SoftwareApplication', 'BlogPosting'].includes(node['@type']),
    ),
  )
})

test('blog index describes a collection, blog and the same posts visible in HTML', () => {
  const html = read('/blog')
  const head = headOf(html)
  const graph = graphOf(head)
  const page = graph.find((node) => node['@type'] === 'CollectionPage')
  const blog = graph.find((node) => node['@type'] === 'Blog')
  const list = graph.find((node) => node['@type'] === 'ItemList')
  assert.equal(page.mainEntity['@id'], blog['@id'])
  assert.equal(page.hasPart['@id'], list['@id'])
  assert.equal(list.numberOfItems, blog.blogPost.length)
  assert.equal(
    list.numberOfItems,
    (html.match(/class="journal-card"/g) || []).length,
  )
  for (const item of list.itemListElement) {
    assert.ok(html.includes(`href="${new URL(item.url).pathname}"`))
    const post = graph.find((node) => node['@id'] === item.item['@id'])
    assert.equal(post.isPartOf['@id'], blog['@id'])
    assert.ok(blog.blogPost.some((ref) => ref['@id'] === post['@id']))
  }
  assert.ok(head.includes('property="og:type" content="website"'))
  assert.ok(!head.includes('property="article:published_time"'))
})

test('solutions collection points at real visible sections, preserving fragment identifiers', () => {
  const html = read('/solutions')
  const graph = graphOf(headOf(html))
  const page = graph.find((node) => node['@type'] === 'CollectionPage')
  const list = graph.find((node) => node['@type'] === 'ItemList')
  assert.equal(page.mainEntity['@id'], list['@id'])
  for (const item of list.itemListElement) {
    const url = new URL(item.url)
    assert.equal(url.pathname, '/solutions')
    assert.ok(url.hash)
    assert.ok(html.includes(`id="${url.hash.slice(1)}"`))
  }
})

for (const [
  path,
  version,
  commit,
  repository = 'haih-net/haih.site',
  published = '2026-09-28',
] of [
  [
    '/blog/two-protocols-one-development-loop',
    '84a5668',
    '84a5668d50422be96e0062f99c3b0a2c3e51e674',
    'haih-net/haih.site',
    '2026-10-06',
  ],
  [
    '/blog/open-to-bots-closed-to-abuse',
    'ff06b51',
    'ff06b5113a189624ed0c002e8ccbd4bd5fdf507b',
    'haih-net/haih.site',
    '2026-10-06',
  ],
  [
    '/blog/the-tests-passed-which-tests',
    '349ed44',
    '349ed447f43298394bdc74dea72546aa922337ec',
    'haih-net/haih.site',
    '2026-10-06',
  ],
  [
    '/blog/a-small-site-and-the-limits-we-found',
    'v0.1.0-1-gccf201e',
    'ccf201ec57dcf867e11c2f389ebfd0875a72b8a6',
  ],
  [
    '/blog/one-server-two-modes-and-an-api',
    'v0.2.0',
    'a83f4993e06c287a0e4e7639ef2b6521d60b3232',
  ],
  [
    '/blog/eighteen-hours-a-real-portal-in-production',
    'pivkarta.ru-v1.0.0',
    '2f1caf82078c510099e2c2a98c9cf52ee369c65a',
    'Pivkarta/pivkarta.ru-3',
    '2026-09-29',
  ],
]) {
  test(`${path} connects author, image and frozen revision`, () => {
    const html = read(path)
    const graph = graphOf(headOf(html))
    const article = graph.find((node) => node['@type'] === 'BlogPosting')
    const person = graph.find((node) => node['@type'] === 'Person')
    assert.equal(person['@id'], 'https://fi1osof.ru/about')
    assert.ok(person.sameAs.includes('https://orcid.org/0009-0007-9285-0801'))
    assert.equal(article.author['@id'], person['@id'])
    assert.equal(
      article.isPartOf['@id'],
      'https://xn-----7kcbauaijpauj5couvu.xn--p1ai/blog#blog',
    )
    assert.ok(html.includes(author.name))
    assert.ok(html.includes('>ORCID</a>'))
    assert.equal(article.about.version, version)
    assert.equal(
      article.citation,
      `https://github.com/${repository}/commit/${commit}`,
    )
    assert.equal(article.datePublished, published)
    assert.equal(article.dateModified, undefined)
    const imagePath = new URL(article.image.url).pathname
    assert.ok(imagePath.startsWith('/assets/'))
    assert.ok(
      existsSync(new URL(`../../build/client${imagePath}`, import.meta.url)),
    )
    assert.equal(
      graph.find((node) => node['@type'] === 'BreadcrumbList').itemListElement
        .length,
      3,
    )
  })
}

test('unknown SSR route is 404 and noindex without a fabricated canonical or article', async () => {
  const { createRequestHandler } = await import('react-router')
  const { createRequire } = await import('node:module')
  const build = createRequire(import.meta.url)('../../build/server/index.js')
  const response = await createRequestHandler(
    build,
    'production',
  )(
    new globalThis.Request(
      'https://xn-----7kcbauaijpauj5couvu.xn--p1ai/missing-seo-page',
    ),
  )
  assert.equal(response.status, 404)
  const html = await response.text()
  const head = headOf(html)
  assert.ok(head.includes('noindex'))
  assert.ok(!head.includes('rel="canonical"'))
  assert.ok(!head.includes('BlogPosting'))
})
