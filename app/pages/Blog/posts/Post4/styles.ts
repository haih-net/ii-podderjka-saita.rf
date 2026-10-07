import { styled } from '@linaria/react'
import { BlogStyled } from '../../styles'

export const TestingPostStyled = styled(BlogStyled)`
  .testing-example {
    overflow-x: auto;
    padding: 1.25rem;
    background: #10172a;
    color: #f5f8fc;
    border-left: 3px solid #e56448;
    font-size: 0.85rem;
    line-height: 1.8;
  }
  .testing-example code {
    padding: 0;
    background: transparent;
    font-size: inherit;
  }
  .testing-layers {
    display: grid;
    gap: 1rem;
    margin-block: 2rem;
  }
  .testing-layers > div {
    padding: 1.25rem;
    border-top: 3px solid #0052cc;
    background: #f1f5fb;
  }
  .testing-layers h3 {
    margin: 0 0 0.75rem;
    color: #0052cc;
  }
  .testing-layers p {
    margin: 0;
    font-size: 0.95rem;
  }
  .testing-evidence {
    padding-left: 1.3rem;
    line-height: 1.8;
  }
  .testing-evidence li + li {
    margin-top: 0.65rem;
  }
  @media (min-width: 48rem) {
    .testing-layers {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
`
