import { styled } from '@linaria/react'

export const DocumentStyled = styled.html`
  color: #202020;
  background: #fff;
  font-family: system-ui, sans-serif;
  line-height: 1.7;
  body {
    margin: 0;
  }
`

export const ShellStyled = styled.div`
  & {
    max-width: 50rem;
    margin: 0 auto;
    padding: 1rem;
    overflow-wrap: anywhere;
  }
  &,
  & * {
    box-sizing: border-box;
  }
  a {
    color: #174b9c;
    text-underline-offset: 0.2em;
  }
  a:hover {
    text-decoration-thickness: 2px;
  }
  :focus-visible {
    outline: 2px solid #174b9c;
    outline-offset: 4px;
  }
  header {
    border-bottom: 1px solid #ddd;
    padding-block: 1rem 1.5rem;
  }
  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
    margin-top: 1rem;
  }
  nav a[aria-current='page'] {
    color: #202020;
    font-weight: 700;
  }
  main {
    padding-block: 1.5rem;
  }
  h1 {
    font-size: 2rem;
    line-height: 1.2;
    letter-spacing: -0.025em;
  }
  h2 {
    font-size: 1.45rem;
    line-height: 1.35;
    margin-top: 2.5rem;
  }
  h3 {
    font-size: 1.1rem;
    margin-top: 1.5rem;
  }
  p,
  ul,
  ol {
    margin-block: 1rem;
  }
  li + li {
    margin-top: 0.65rem;
  }
  section {
    scroll-margin-top: 1.5rem;
  }
  footer {
    border-top: 1px solid #ddd;
    padding-block: 1.5rem;
  }
  .brand {
    font-weight: 700;
  }
  .lead {
    font-size: 1.125rem;
  }
  .page-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1.5rem;
  }
  .skip-link {
    position: absolute;
    left: -10000px;
  }
  .skip-link:focus {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    padding: 1rem;
    background: white;
  }
  [id] {
    scroll-margin-top: calc(var(--site-header-height, 112px) + 20px);
  }
  h1:focus {
    outline: none;
  }
  @media (min-width: 48rem) {
    & {
      padding: 2rem;
    }
    h1 {
      font-size: 2.75rem;
    }
  }
`

export const SiteFrameStyled = styled(ShellStyled)`
  && {
    max-width: none;
    padding: 0;
    --site-header-height: 112px;
    color: #191c24;
  }
  && main {
    max-width: 50rem;
    margin: 0 auto;
    padding: 1.5rem 1.25rem;
  }
  &&[data-landing='true'] main {
    max-width: none;
    padding: 0;
  }
  && section {
    scroll-margin-top: calc(var(--site-header-height) + 24px);
  }
  && main > section[aria-labelledby='agent-conversation-title'] {
    max-width: 85rem;
    margin: 0 auto;
    padding: 3rem 1.25rem;
    border-top: 1px solid #ccd0d8;
  }
  && main > section[aria-labelledby='agent-conversation-title'] h2 {
    margin-top: 0;
  }
  @media (min-width: 48rem) {
    && {
      --site-header-height: 80px;
    }
    && main > section[aria-labelledby='agent-conversation-title'] {
      padding: 4rem 2.5rem;
    }
  }
`

export const HeaderStyled = styled.header`
  && {
    position: sticky;
    top: 0;
    z-index: 20;
    background: #f1f2f4;
    border-bottom: 1px solid #ccd0d8;
    padding: 12px 20px;
    min-height: var(--site-header-height);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px 16px;
  }
  && .site-brand {
    display: inline-flex;
    gap: 10px;
    align-items: center;
    color: #191c24;
    text-decoration: none;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.2;
  }
  && .site-mark {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    background: #244beb;
    color: white;
    font-size: 15px;
    letter-spacing: -1px;
  }
  && nav {
    display: flex;
    gap: 20px;
    margin: 0;
    order: 3;
    flex-basis: 100%;
    align-items: center;
  }
  && nav a {
    min-height: 32px;
    display: inline-flex;
    align-items: center;
    font-size: 13px;
    text-decoration: none;
    color: #424854;
  }
  && nav a[aria-current='page'] {
    color: #244beb;
  }
  && .site-contact {
    font-size: 13px;
    color: #244beb;
    text-decoration: none;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    font-weight: 650;
  }
  @media (min-width: 48rem) {
    && {
      flex-wrap: nowrap;
      padding: 16px 40px;
    }
    && nav {
      order: 0;
      flex-basis: auto;
      margin-left: auto;
      gap: 28px;
    }
    && .site-contact {
      margin-left: 24px;
    }
    && .site-brand {
      font-size: 16px;
    }
  }
`

export const FooterStyled = styled.footer`
  && {
    border-top: 1px solid #ccd0d8;
    padding: 2rem 1.25rem;
    background: #f1f2f4;
  }
  && .footer-inner {
    max-width: 85rem;
    margin: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.5rem;
  }
  && p {
    margin: 0;
    font-size: 0.85rem;
    color: #424854;
  }
  && strong {
    display: block;
    color: #191c24;
    margin-bottom: 0.4rem;
  }
  && a {
    color: #244beb;
    font-size: 1.35rem;
    text-decoration: none;
    padding: 0.5rem 0;
  }
  @media (min-width: 48rem) {
    && {
      padding: 2.5rem;
    }
  }
`

export const UnavailableStyled = styled.article`
  & {
    min-height: calc(100svh - var(--site-header-height, 112px));
    padding: 3rem 1.25rem;
    background: #f1f2f4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  & h1 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: clamp(2.5rem, 6vw, 5rem);
    line-height: 1.05;
    letter-spacing: -0.045em;
    max-width: 16ch;
    margin: 0 0 1.5rem;
  }
  & p {
    max-width: 40rem;
    color: #424854;
  }
  & a {
    color: #244beb;
    padding-block: 0.75rem;
  }
  @media (min-width: 48rem) {
    & {
      padding: 4rem max(2.5rem, calc((100vw - 1344px) / 2));
    }
  }
`
