import styled from 'styled-components'
import { theme } from '.'

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  & > div:first-child {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem 2rem;

    & > a {
      text-decoration: none;
      text-transform: uppercase;
      font-weight: 500;
      color: ${theme.color.dark};
      position: relative;
      display: inline-block;

      &::before {
        content: '';
        width: 2rem;
        height: 2px;
        background: ${theme.color.primary};
        position: absolute;
        top: -2px;
        left: 0;
      }

      &::after {
        content: '';
        width: 2rem;
        height: 2px;
        background: ${theme.color.primary};
        position: absolute;
        right: 0;
        bottom: 0;
      }
    }
  }

  & > ul {
    list-style: none;
    padding: 3rem 0;

    & > li {
      line-height: 3;
      padding: 0 2rem;

      &.active {
        & > a {
          color: ${theme.color.primary};
        }

        background: ${theme.color.primary + '1f'};
        border-right: 3px solid ${theme.color.primary};
      }

      & > a {
        text-decoration: none;
        display: flex;
        align-items: center;
        color: ${theme.color.lightDark};
        transition: all 0.3s ease;

        &:hover {
          color: ${theme.color.primary};
        }

        & > svg {
          margin-top: -3px;
          margin-right: 1rem;
          width: 1.8rem;
          height: 1.8rem;
        }
      }
    }
  }
`
