import React from 'react'
import { Wrapper } from '../../styles/authLayout'

const AuthLayout: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <div />
      <div>{children}</div>
    </Wrapper>
  )
}

export default AuthLayout
