import styled from 'styled-components'

export const Wrapper = styled.form`
  width: 100%;
  height: auto;
  margin-top: 2rem;

  & > div {
    width: 100%;
    padding: 2rem 0;
    display: flex;
    align-items: flex-start;

    & > strong {
      display: inline-block;
      width: 20rem;
      position: relative;

      &::before {
        content: ':';
        position: absolute;
        top: 0;
        right: 5rem;
      }
    }

    & img {
      display: inline-block;
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 1rem;

      &.not-rounded {
        border-radius: 3px;
      }
    }
  }
`
