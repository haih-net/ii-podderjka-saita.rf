import type { Config } from '@react-router/dev/config'

const config: Config = {
  ssr: true,
  prerender: [
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
  ],
  routeDiscovery: { mode: 'initial' },
}
export default config
