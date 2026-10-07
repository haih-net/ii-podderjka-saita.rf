import type { Config } from '@react-router/dev/config'

const config: Config = {
  ssr: true,
  prerender: [
    '/',
    '/contact',
    '/solutions',
    '/blog',
    '/blog/two-protocols-one-development-loop',
    '/blog/open-to-bots-closed-to-abuse',
    '/blog/the-tests-passed-which-tests',
    '/blog/eighteen-hours-a-real-portal-in-production',
    '/blog/a-small-site-and-the-limits-we-found',
    '/blog/one-server-two-modes-and-an-api',
  ],
  routeDiscovery: { mode: 'initial' },
}
export default config
