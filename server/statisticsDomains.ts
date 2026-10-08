import { domainToUnicode } from 'node:url'

export const decodeStatisticsDomain = (hostname: string): string =>
  domainToUnicode(hostname) || hostname

export const decodeStatisticsUrl = (value: string): string => {
  let url: URL
  try {
    url = new URL(value)
  } catch {
    // Referer headers can be empty or malformed; do not fail a page view.
    return value
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return value
  }
  const hostname: string = decodeStatisticsDomain(url.hostname)
  if (hostname === url.hostname) {
    return value
  }
  const credentials: string =
    url.username || url.password
      ? `${url.username}${url.password ? `:${url.password}` : ''}@`
      : ''
  const port: string = url.port ? `:${url.port}` : ''
  // URL.hostname setters and URL.href serialize Unicode hosts back to punycode.
  // Keep the parsed URL components encoded and substitute only the hostname.
  return `${url.protocol}//${credentials}${hostname}${port}${url.pathname}${url.search}${url.hash}`
}
