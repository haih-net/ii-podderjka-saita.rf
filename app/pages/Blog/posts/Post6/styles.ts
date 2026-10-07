import { styled } from '@linaria/react'
import { BlogStyled } from '../../styles'

export const DevelopmentPostStyled = styled(BlogStyled)`
  .protocol-pair {
    display: grid;
    gap: 1rem;
    margin-block: 2rem;
  }
  .protocol-pair > div {
    padding: 1.4rem;
    border-top: 3px solid #0052cc;
    background: #f1f5fb;
    min-width: 0;
  }
  .protocol-pair > div:last-child {
    border-color: #287148;
    background: #eff6f0;
  }
  .protocol-pair h3 {
    margin-top: 0;
    font-size: 1.4rem;
  }
  .protocol-pair p {
    font-size: 1rem;
    overflow-wrap: anywhere;
  }
  .development-example {
    padding: 1.25rem;
    background: #10172a;
    color: #f5f7fa;
    overflow-x: auto;
    font-size: 0.85rem;
    line-height: 1.8;
  }
  .field-note-body .development-example code {
    background: transparent;
    color: inherit;
    padding: 0;
  }
  .development-evidence {
    padding-left: 1.4rem;
    line-height: 1.8;
  }
  .development-evidence li {
    margin-block: 0.75rem;
  }
  @media (min-width: 48rem) {
    .protocol-pair {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`
