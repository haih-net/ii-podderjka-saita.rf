import { styled } from '@linaria/react'
import { BlogStyled } from '../../styles'

export const MonitoringPostStyled = styled(BlogStyled)`
  .monitoring-pillars {
    display: grid;
    gap: 1rem;
    margin-block: 2rem;
  }
  .monitoring-pillars > div {
    padding: 1.4rem;
    border-top: 3px solid #0052cc;
    background: #f1f5fb;
  }
  .monitoring-pillars > div:last-child {
    border-color: #287148;
    background: #eff6f0;
  }
  .monitoring-pillars span {
    color: #536789;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
  }
  .monitoring-pillars h3 {
    margin-block: 0.7rem;
    font-size: 1.4rem;
  }
  .monitoring-pillars p {
    margin-bottom: 0;
    font-size: 1rem;
  }
  .monitoring-tools {
    margin-block: 2rem;
  }
  .monitoring-tools > div {
    border-top: 1px solid #dce3ee;
    padding-block: 1rem;
  }
  .monitoring-tools dt {
    font-weight: 700;
    color: #0052cc;
  }
  .monitoring-tools dd {
    margin: 0.5rem 0 0;
    line-height: 1.7;
    font-size: 1rem;
  }
  .monitoring-steps {
    padding-left: 1.5rem;
    line-height: 1.8;
  }
  .monitoring-steps li {
    padding-left: 0.4rem;
    margin-block: 1.2rem;
  }
  .monitoring-steps li::marker {
    color: #287148;
    font-weight: 700;
  }
  @media (min-width: 48rem) {
    .monitoring-pillars {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`
