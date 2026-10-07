import { styled } from '@linaria/react'

export const HomeStyled = styled.article`
  & .home-body {
    max-width: 90rem;
    margin: 0 auto;
  }
  & .home-body > section {
    padding: 3.5rem 1.25rem;
  }
  & .section-label {
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    color: #244beb;
    font-weight: 650;
    margin: 0 0 1rem;
  }
  & .home-body h2 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: clamp(2rem, 4vw, 3.75rem);
    line-height: 1.08;
    letter-spacing: -0.045em;
    margin: 0 0 1.5rem;
  }
  & .home-body h3 {
    font-size: 1.2rem;
    line-height: 1.3;
    margin: 0 0 0.75rem;
    letter-spacing: -0.025em;
  }
  & .home-body p {
    color: #424854;
    max-width: 42rem;
  }
  & .home-body .section-label {
    color: #244beb;
  }
  & .section-intro {
    font-size: 1.1rem;
    line-height: 1.65;
  }
  & .care-list {
    display: grid;
    gap: 2rem;
    margin-top: 2.5rem;
  }
  & .care-list section {
    padding-top: 1.25rem;
    border-top: 1px solid #ccd0d8;
  }
  & .care-list p {
    margin-bottom: 0;
  }
  & .working-section {
    background: #f1f2f4;
    display: grid;
    gap: 1.5rem;
  }
  & .work-steps {
    list-style: none;
    padding: 0;
    margin: 0;
    counter-reset: work;
  }
  & .work-steps li {
    position: relative;
    padding: 0 0 1.5rem 3rem;
    counter-increment: work;
  }
  & .work-steps li + li {
    padding-top: 1.5rem;
    border-top: 1px solid #ccd0d8;
    margin: 0;
  }
  & .work-steps li::before {
    content: '0' counter(work);
    position: absolute;
    left: 0;
    color: #244beb;
    font-size: 0.9rem;
  }
  & .work-steps p {
    margin: 0;
  }
  & .experience-section {
    display: grid;
    gap: 2.5rem;
  }
  & .experience-year {
    display: flex;
    flex-direction: column;
    align-self: start;
    border-top: 4px solid #244beb;
    padding-top: 1rem;
  }
  & .experience-year strong {
    font-size: clamp(3.5rem, 7vw, 6rem);
    letter-spacing: -0.07em;
    line-height: 1.3;
    color: #244beb;
  }
  & .experience-year span {
    font-size: 0.85rem;
    color: #424854;
  }
  & .detail-link {
    display: inline-flex;
    gap: 2rem;
    align-items: center;
    min-height: 48px;
    color: #244beb;
  }
  & .home-body .price-section {
    display: grid;
    gap: 2rem;
    background: #244beb;
    color: white;
  }
  & .price-section p,
  & .price-section .section-label {
    color: #fff;
  }
  & .price-section h2 {
    font-size: clamp(2.8rem, 5vw, 5rem);
  }
  & .price-section small {
    display: block;
    font-size: 1.1rem;
    letter-spacing: 0;
    font-weight: 400;
    margin-top: 0.75rem;
  }
  & .first-month {
    border-top: 1px solid #8ba0ff;
    padding-top: 1.75rem;
  }
  & .first-month h3 {
    font-size: 1.5rem;
  }
  @media (min-width: 48rem) {
    & .home-body > section {
      padding: 5rem 2.5rem;
    }
    & .care-list {
      grid-template-columns: 1fr 1fr;
      gap: 2.5rem 4rem;
      margin-top: 3.5rem;
    }
    & .working-section,
    & .experience-section,
    & .home-body .price-section {
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
    }
    & .first-month {
      border-top: 0;
      border-left: 1px solid #8ba0ff;
      padding: 0 0 0 2rem;
    }
  }
  @media (min-width: 80rem) {
    & .home-body > section {
      padding: 6rem 3rem;
    }
  }
`

export const HeroStyled = styled.section`
  & {
    background: #f1f2f4;
    color: #191c24;
    min-height: calc(100vh - var(--site-header-height, 0px));
    min-height: calc(100svh - var(--site-header-height, 0px));
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.75rem;
  }
  & .hero-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ccd0d8;
    font-size: 0.75rem;
    letter-spacing: 0.06em;
  }
  & .hero-top p {
    margin: 0;
  }
  & .hero-top span {
    color: #4e5461;
  }
  & .hero-grid {
    display: grid;
    gap: 1.5rem;
  }
  & .hero-copy {
    align-self: center;
  }
  & .hero-kicker {
    color: #244beb;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin: 0 0 1rem;
    font-weight: 650;
  }
  & h1 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: clamp(2.7rem, 11vw, 4.5rem);
    font-weight: 700;
    line-height: 0.99;
    letter-spacing: -0.06em;
    margin: 0 0 1.25rem;
  }
  & h1 span {
    display: block;
    color: #244beb;
  }
  & .hero-description {
    font-size: 1rem;
    line-height: 1.6;
    max-width: 29rem;
    margin: 0 0 1.5rem;
    color: #424854;
  }
  & .hero-offer {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem 1.5rem;
  }
  & .hero-offer a {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    background: #244beb;
    color: #fff;
    padding: 0.85rem 1.1rem;
    text-decoration: none;
    font-size: 0.9rem;
    min-height: 48px;
  }
  & .hero-offer a:hover {
    background: #1638b9;
  }
  & .hero-price {
    margin: 0;
    font-size: 0.85rem;
    line-height: 1.5;
  }
  & .hero-price strong {
    display: block;
    font-size: 1.1rem;
  }
  & figure {
    margin: 0;
    min-width: 0;
  }
  & figure img {
    display: block;
    width: 100%;
    height: clamp(180px, 28svh, 320px);
    aspect-ratio: auto;
    object-fit: cover;
  }
  & .hero-bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0.5rem 1.5rem;
    border-top: 1px solid #ccd0d8;
    padding-top: 1rem;
    font-size: 0.75rem;
    color: #4e5461;
  }
  @media (min-width: 48rem) {
    & {
      padding: 1.75rem 2.5rem;
    }
    & .hero-grid {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 2rem;
    }
    & h1 {
      font-size: clamp(3.2rem, 6.1vw, 6.6rem);
    }
    & figure img {
      height: auto;
      aspect-ratio: 1;
    }
    & .hero-description {
      font-size: 1.1rem;
    }
    & .hero-top {
      font-size: 0.85rem;
    }
    & .hero-bottom {
      font-size: 0.85rem;
    }
  }
  @media (min-width: 80rem) {
    & {
      padding-inline: max(3rem, calc((100vw - 1440px) / 2));
    }
    & .hero-grid {
      gap: 4rem;
    }
    & figure {
      max-width: 660px;
    }
  }
`
