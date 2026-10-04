import { index, route, type RouteConfig } from '@react-router/dev/routes'

const routes: RouteConfig = [
  index('routes/_index.tsx'),
  route('services', 'routes/services.tsx'),
  route('how-it-works', 'routes/how-it-works.tsx'),
  route('website-lifecycle', 'routes/website-lifecycle.tsx'),
  route('contact', 'routes/contact.tsx'),
  route('services/reliability', 'routes/services.reliability.tsx'),
  route('services/maintenance', 'routes/services.maintenance.tsx'),
  route('services/content', 'routes/services.content.tsx'),
  route('services/improvements', 'routes/services.improvements.tsx'),
  route('services/analytics', 'routes/services.analytics.tsx'),
  route('services/modernization', 'routes/services.modernization.tsx'),
  route('*', 'routes/$.tsx'),
]
export default routes
