import styled from 'styled-components'
import authImg from '../assets/images/auth.jpg'

export const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 50rem;

  & > div:first-child {
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url(${authImg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }

  & > div:last-child {
    background: #ffffff;
    padding: 2rem;

    & > h3 {
      margin-bottom: 2rem;
    }
  }
`
