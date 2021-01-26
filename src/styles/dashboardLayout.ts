import styled from 'styled-components'
import { theme } from '.'

export const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;

  & > aside {
    flex: 0 0 240px;
    border-right: 1px solid ${theme.color.lightWhite};
  }

  & > main {
    flex: 1;
    display: flex;
    flex-direction: column;

    & > header {
      height: 5rem;
      border-bottom: 1px solid ${theme.color.lightWhite};
    }

    & > section {
      flex: 1;
      overflow-y: auto;
      background: ${theme.color.lightWhite};
      padding: 2rem;
    }
  }

  & [datatype='main-content'] {
    background: ${({ theme }) => theme.color.white};
    margin-top: 2rem;
    padding: 2rem;
    border-radius: 3px;
    border: 1px solid ${({ theme }) => theme.color.white};
  }
`
