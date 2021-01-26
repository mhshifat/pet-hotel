import styled from 'styled-components'
import { theme } from '.'

export const Wrapper = styled.form`
  width: 100%;
  height: auto;
  margin-top: 2rem;

  & > [datatype='input'] {
    margin-top: 2rem;
  }

  & > h6 {
    font-size: 1.5rem;
    font-weight: 400;
    margin: 2rem 0 3rem;

    & > span {
      color: ${({ theme }) => theme.color.primary};
      margin-left: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        opacity: 0.5;
      }
    }
  }

  & > p {
    width: 85%;
    margin: 3rem auto;
    text-align: center;
  }

  & a {
    padding-bottom: 10rem;
    color: ${theme.color.primary};
    text-decoration: none;
  }
`
