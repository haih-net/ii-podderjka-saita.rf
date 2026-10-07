import { styled } from '@linaria/react'

export const LandingStyled = styled.article`
  & {
    color: #191c24;
  }
  & .eyebrow {
    color: #244beb;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 650;
    margin: 0 0 1.25rem;
  }
  & .page-details {
    max-width: 90rem;
    margin: auto;
    scroll-margin-top: calc(var(--site-header-height) + 20px);
  }
  & .detail-section {
    padding: 3rem 1.25rem;
    border-top: 1px solid #ccd0d8;
    display: grid;
    gap: 1.25rem;
  }
  & .detail-section h2 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: clamp(1.8rem, 3.3vw, 3rem);
    line-height: 1.12;
    letter-spacing: -0.04em;
    margin: 0;
  }
  & .detail-copy {
    max-width: 42rem;
  }
  & .detail-copy > :first-child {
    margin-top: 0;
  }
  & .detail-copy > :last-child {
    margin-bottom: 0;
  }
  & .detail-copy p {
    color: #424854;
  }
  & .detail-copy h3 {
    font-size: 1.2rem;
    line-height: 1.3;
    margin: 1.75rem 0 0.6rem;
  }
  & .detail-copy a {
    color: #244beb;
    display: inline-block;
    padding-block: 0.5rem;
  }
  & .detail-accent {
    background: #244beb;
    color: #fff;
    border-color: #244beb;
  }
  & .detail-accent p,
  & .detail-accent a {
    color: #fff;
  }
  & .editorial-list {
    padding-left: 1.25rem;
  }
  & .editorial-list li {
    padding: 0.5rem 0;
  }
  & .editorial-list strong {
    display: block;
  }
  @media (min-width: 48rem) {
    & .detail-section {
      padding: 4.5rem 2.5rem;
      grid-template-columns: 0.85fr 1.15fr;
      gap: 3rem;
    }
  }
  @media (min-width: 80rem) {
    & .detail-section {
      padding: 5rem 3rem;
      gap: 5rem;
    }
  }
`

export const IntroStyled = styled.section`
  & {
    min-height: calc(100vh - var(--site-header-height));
    min-height: calc(100svh - var(--site-header-height));
    padding: 2rem 1.25rem 1.25rem;
    background: #f1f2f4;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
  }
  & .intro-grid {
    display: grid;
    gap: 2rem;
    flex: 1;
    align-items: center;
  }
  & h1 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: clamp(2.35rem, 8.6vw, 4rem);
    letter-spacing: -0.05em;
    line-height: 1.04;
    margin: 0 0 1.25rem;
  }
  & .intro-text {
    color: #424854;
    line-height: 1.65;
    margin: 0 0 1.5rem;
    max-width: 34rem;
  }
  & .intro-action {
    display: inline-flex;
    align-items: center;
    gap: 2.5rem;
    background: #244beb;
    color: #fff;
    min-height: 48px;
    padding: 0.6rem 1.1rem;
    text-decoration: none;
    font-size: 0.9rem;
  }
  & .intro-action:hover {
    background: #1638b9;
  }
  & .intro-foot {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.5rem 1rem;
    padding-top: 1rem;
    border-top: 1px solid #ccd0d8;
    font-size: 0.75rem;
    color: #4e5461;
  }
  & .intro-visual {
    min-width: 0;
  }
  & .intro-visual img {
    display: block;
    width: 100%;
    height: clamp(220px, 32svh, 420px);
    object-fit: cover;
  }
  & .intro-visual .portrait {
    object-position: center 27%;
  }
  & .visual-label {
    font-size: 0.75rem;
    color: #4e5461;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0 0 1.25rem;
  }
  & .visual-flow {
    list-style: none;
    margin: 0;
    padding: 0;
    counter-reset: step;
  }
  & .visual-flow li {
    display: grid;
    grid-template-columns: 2.25rem 1fr;
    padding: 0.85rem 0;
    border-top: 1px solid #bdc4d0;
    counter-increment: step;
    margin: 0;
  }
  & .visual-flow li::before {
    content: '0' counter(step);
    color: #244beb;
    font-size: 0.8rem;
    padding-top: 0.4rem;
  }
  & .visual-flow strong {
    font-size: clamp(1.35rem, 2.5vw, 2.2rem);
    line-height: 1.15;
    letter-spacing: -0.04em;
  }
  & .visual-flow small {
    display: block;
    color: #4e5461;
    font-size: 0.8rem;
    line-height: 1.5;
    margin-top: 0.4rem;
  }
  & .visual-sheet {
    background: #fff;
    padding: 1.5rem;
    border-top: 5px solid #244beb;
  }
  & .visual-sheet h2 {
    margin: 0 0 1rem;
    font-size: 1.5rem;
    line-height: 1.15;
    letter-spacing: -0.035em;
  }
  & .visual-sheet p {
    font-size: 0.95rem;
    color: #424854;
  }
  & .visual-sheet .large-value {
    font-size: clamp(3.8rem, 13vw, 7rem);
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 700;
    letter-spacing: -0.065em;
    line-height: 1;
    color: #244beb;
    margin: 1rem 0;
    white-space: nowrap;
  }
  & .visual-sheet .period {
    display: block;
    color: #424854;
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
  & .visual-sheet hr {
    border: 0;
    border-top: 1px solid #ccd0d8;
    margin: 1.5rem 0;
  }
  & .visual-sheet .contact-link {
    display: inline-flex;
    min-height: 48px;
    align-items: center;
    gap: 1rem;
    color: #244beb;
    font-size: clamp(1.5rem, 4vw, 2.6rem);
    letter-spacing: -0.045em;
    text-decoration: none;
  }
  & .contact-note {
    font-size: 0.8rem;
    color: #626977;
  }
  @media (min-width: 48rem) {
    & {
      padding: 2.5rem;
      gap: 2.5rem;
    }
    & .intro-grid {
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
      gap: 3rem;
    }
    & h1 {
      font-size: clamp(2.8rem, 4.9vw, 5.3rem);
    }
    & .intro-text {
      font-size: 1.1rem;
    }
    & .intro-visual img {
      height: auto;
      max-height: 66svh;
      aspect-ratio: 1;
    }
    & .intro-visual .portrait {
      aspect-ratio: 0.86;
    }
    & .visual-sheet {
      padding: 2rem;
    }
    & .visual-sheet .large-value {
      font-size: clamp(2.8rem, 7vw, 6.5rem);
    }
    & .visual-flow li {
      padding-block: 1.4rem;
    }
  }
  @media (min-width: 80rem) {
    & {
      padding-inline: max(3rem, calc((100vw - 1344px) / 2));
    }
    & .intro-grid {
      gap: 5rem;
    }
  }
`

export const SummaryStyled = styled.section`
  & {
    padding: 3rem 1.25rem;
    background: #f1f2f4;
  }
  & h2 {
    font-size: clamp(1.8rem, 3.3vw, 3rem);
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: -0.04em;
    line-height: 1.12;
    margin: 0 0 2rem;
  }
  & .summary-columns {
    display: grid;
    gap: 1.5rem;
  }
  & .summary-columns > div {
    border-top: 1px solid #ccd0d8;
    padding-top: 1.25rem;
  }
  & h3 {
    font-size: 1.05rem;
    margin: 0 0 0.75rem;
  }
  & p {
    color: #424854;
    margin: 0;
  }
  @media (min-width: 48rem) {
    & {
      padding: 4.5rem 2.5rem;
    }
    & .summary-columns {
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }
  }
  @media (min-width: 80rem) {
    & {
      padding: 5rem 3rem;
    }
  }
`
