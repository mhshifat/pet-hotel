import styled from 'styled-components'

export const Wrapper = styled.form`
  width: 100%;
  height: auto;
  margin-top: 2rem;

  & > [datatype='input'] {
    margin-top: 2rem;
    max-width: 40rem;
  }

  & > button {
    display: flex;
    align-items: center;
    margin-top: 3rem;

    & > svg {
      margin-right: 0.5rem;
    }
  }

  & > [datatype='uploader'] {
    max-width: 40rem;
    margin-top: 2rem;
  }

  & > [datatype='select'] {
    max-width: 40rem;
    margin-top: 2rem;
  }

  & .rdrCalendarWrapper {
    margin-top: 2rem;
    width: 100%;
    max-width: 40rem;
    border: 2px solid ${({ theme }) => theme.color.lightWhite};
    border-radius: 3px;

    & .rdrMonths {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`
