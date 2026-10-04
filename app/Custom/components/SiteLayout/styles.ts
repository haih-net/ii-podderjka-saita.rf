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
    position: static;
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
